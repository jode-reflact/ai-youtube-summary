import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { EmailTakenError } from '../common/errors/email-taken.error';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/environment-variables';
import { InvalidEmailError } from '../common/errors/invalid-email.error';
import { InvalidPasswordError } from '../common/errors/invalid-password.error';
import { InvalidCredentialsError } from '../common/errors/invalid-credentials.error';
import { UserNotFoundError } from '../common/errors/user-not-found.error';
import { EmailNotConfirmedError } from '../common/errors/email-not-confirmed.error';
import { UserAlreadyConfirmedError } from '../common/errors/user-already-confirmed.error';
import { InvalidTokenError } from '../common/errors/invalid-token.error';
import { TokenExpiredError } from '../common/errors/token-expired.error';
import { isExpired } from '../common/util/is-expired';

@Injectable()
class UsersService {
  private readonly FRONTEND_HOST = this.configService.get('FRONTEND_HOST', {
    infer: true,
  });

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (user == null) {
      throw new UserNotFoundError(email);
    }

    return user;
  }

  async findUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new UserNotFoundError(id);
    }

    const user = await this.userModel.findById(id).exec();
    if (user == null) {
      throw new UserNotFoundError(id);
    }

    return user;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    await this.validateEmailConfirmation(email);
    await this.validateCredentials({ email, password });

    return this.createLoginTokens(email);
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    const { userId, confirmationToken } = await this.createUser(
      email,
      password,
    );
    await this.sendConfirmationMail({ email, userId, confirmationToken });
  }

  async confirmEmail(userId: string, confirmationToken: string) {
    const user = await this.findUserById(userId);

    await this.validateConfirmationToken(user, confirmationToken);

    await this.saveConfirmedUser(user);
  }

  async resendConfirmationLink(userId: string) {
    const { email, confirmationToken } = await this.renewConfirmationToken(
      userId,
    );

    await this.sendConfirmationMail({ email, userId, confirmationToken });
  }

  async requestPasswordReset(email: string) {
    const { userId, passwordResetToken } = await this.savePasswordResetToken(
      email,
    );

    await this.sendRequestPasswordResetMail({
      email,
      userId,
      passwordResetToken,
    });
  }

  async resetPassword({
    userId,
    newPassword,
    passwordResetToken,
  }: {
    userId: string;
    newPassword: string;
    passwordResetToken: string;
  }) {
    const user = await this.findUserById(userId);

    await this.validatePasswordResetToken(user, passwordResetToken);

    await this.updatePassword(user, newPassword);
  }

  private async createUser(email: string, password: string) {
    this.validateEmail(email);
    this.validatePassword(password);

    const { confirmationToken, confirmationTokenIssuedAt } =
      await this.buildConfirmationTokenData();
    const passwordHashed = await this.authService.hash(password);
    const confirmationTokenHashed = await this.authService.hash(
      confirmationToken,
    );

    const user = new this.userModel({
      email,
      passwordHashed,
      registeredAt: new Date(),
      confirmationTokenHashed,
      confirmationTokenIssuedAt,
    });

    try {
      await user.save();
    } catch (error) {
      if (this.isEmailTakenError(error)) {
        throw new EmailTakenError(email);
      }
      throw error;
    }

    return {
      userId: user._id.toString(),
      confirmationToken,
    };
  }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) return;

    throw new InvalidEmailError(email);
  }

  validatePassword(password: string) {
    if (password.length < 8) {
      throw new InvalidPasswordError('TOO_SHORT');
    }
    if (password.length > 50) {
      throw new InvalidPasswordError('TOO_LONG');
    }
    if (!/[A-Z]/.test(password)) {
      throw new InvalidPasswordError('NO_UPPERCASE_LETTER');
    }
    if (!/[a-z]/.test(password)) {
      throw new InvalidPasswordError('NO_LOWERCASE_LETTER');
    }
    if (!/[0-9]/.test(password)) {
      throw new InvalidPasswordError('NO_DIGIT');
    }
    if (!/[\W_]/.test(password)) {
      throw new InvalidPasswordError('NO_SPECIAL_CHARACTER');
    }
  }

  private async buildConfirmationTokenData() {
    const confirmationToken = this.authService.generateToken();
    const confirmationTokenIssuedAt = new Date();

    return { confirmationToken, confirmationTokenIssuedAt };
  }

  private isEmailTakenError(error: any) {
    return error.code === 11000;
  }

  private async sendConfirmationMail({
    email,
    userId,
    confirmationToken,
  }: {
    email: string;
    userId: string;
    confirmationToken: string;
  }) {
    const confirmationLink = await this.buildConfirmationLink(
      userId,
      confirmationToken,
    );

    await this.mailService.sendRegistrationMail({ email, confirmationLink });
  }

  private buildConfirmationLink(userId: string, confirmationToken: string) {
    const confirmationLink = new URL(this.FRONTEND_HOST);
    confirmationLink.pathname = '/confirm-registration';
    confirmationLink.searchParams.append('userId', userId);
    confirmationLink.searchParams.append('token', confirmationToken);

    return confirmationLink.toString();
  }

  private async sendRequestPasswordResetMail({
    email,
    userId,
    passwordResetToken: passwordResetToken,
  }: {
    email: string;
    userId: string;
    passwordResetToken: string;
  }) {
    const passwordResetLink = this.buildPasswordResetLink(
      userId,
      passwordResetToken,
    );

    await this.mailService.sendRequestPasswordResetMail({
      email,
      passwordResetLink,
    });
  }

  private buildPasswordResetLink(userId: string, passwordResetToken: string) {
    const passwordResetLink = new URL(this.FRONTEND_HOST);
    passwordResetLink.pathname = '/reset-password';
    passwordResetLink.searchParams.append('userId', userId);
    passwordResetLink.searchParams.append('token', passwordResetToken);

    return passwordResetLink.toString();
  }

  private async validateEmailConfirmation(email: string) {
    const user = await this.findUserByEmail(email);

    if (user.isConfirmed) return;
    throw new EmailNotConfirmedError(email);
  }

  private async validateCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.findUserByEmail(email);

    const passwordMatch = await this.authService.verifyHashes({
      hash: user.passwordHashed,
      plain: password,
    });
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }
  }

  private async createLoginTokens(email: string) {
    const user = await this.findUserByEmail(email);

    const { accessToken, refreshToken } =
      await this.authService.generateLoginTokens({
        userId: user._id.toString(),
        email,
      });

    await this.saveRefreshTokenHashed(user, refreshToken);

    return { accessToken, refreshToken };
  }

  private async saveRefreshTokenHashed(
    user: UserDocument,
    refreshToken: string,
  ) {
    user.refreshTokenHashed = await this.authService.hash(refreshToken);
    await user.save();
  }

  private async validateConfirmationToken(
    user: User,
    confirmationToken: string,
  ) {
    if (user.isConfirmed) {
      throw new UserAlreadyConfirmedError(user.email);
    }

    const confirmationTokenMatch = await this.authService.verifyHashes({
      hash: user.confirmationTokenHashed,
      plain: confirmationToken,
    });
    if (!confirmationTokenMatch) {
      throw new InvalidTokenError();
    }

    const TIME_PERIOD_TO_CONFIRM_EMAIL = this.configService.get(
      'TIME_PERIOD_TO_CONFIRM_EMAIL',
      { infer: true },
    );
    if (
      isExpired(user.confirmationTokenIssuedAt, TIME_PERIOD_TO_CONFIRM_EMAIL)
    ) {
      throw new TokenExpiredError();
    }
  }

  private async saveConfirmedUser(user: UserDocument) {
    user.isConfirmed = true;
    user.confirmationTokenHashed = undefined;
    user.confirmationTokenIssuedAt = undefined;

    await user.save();
  }

  private async renewConfirmationToken(userId: string) {
    const user = await this.findUserById(userId);

    if (user.isConfirmed) {
      throw new UserAlreadyConfirmedError(user.email);
    }

    const { confirmationToken, confirmationTokenIssuedAt } =
      await this.buildConfirmationTokenData();
    user.confirmationTokenHashed = await this.authService.hash(
      confirmationToken,
    );
    user.confirmationTokenIssuedAt = confirmationTokenIssuedAt;
    await user.save();

    return {
      email: user.email,
      confirmationToken,
    };
  }

  private async savePasswordResetToken(email: string) {
    const user = await this.findUserByEmail(email);

    const { passwordResetToken, passwordResetTokenIssuedAt } =
      this.buildPasswordResetTokenData();

    user.passwordResetTokenHashed = await this.authService.hash(
      passwordResetToken,
    );
    user.passwordResetTokenIssuedAt = passwordResetTokenIssuedAt;
    await user.save();

    return { passwordResetToken, userId: user._id.toString() };
  }

  private buildPasswordResetTokenData() {
    const passwordResetToken = this.authService.generateToken();
    const passwordResetTokenIssuedAt = new Date();

    return { passwordResetToken, passwordResetTokenIssuedAt };
  }

  private async validatePasswordResetToken(
    user: User,
    passwordResetToken: string,
  ) {
    const passwordResetTokenMatch = await this.authService.verifyHashes({
      hash: user.passwordResetTokenHashed,
      plain: passwordResetToken,
    });
    if (!passwordResetTokenMatch) {
      throw new InvalidTokenError();
    }

    const TIME_PERIOD_TO_RESET_PASSWORD = this.configService.get(
      'TIME_PERIOD_TO_RESET_PASSWORD',
      { infer: true },
    );
    if (
      isExpired(user.passwordResetTokenIssuedAt, TIME_PERIOD_TO_RESET_PASSWORD)
    ) {
      throw new TokenExpiredError();
    }
  }

  private async updatePassword(user: UserDocument, newPassword: string) {
    this.validatePassword(newPassword);

    user.passwordHashed = await this.authService.hash(newPassword);
    user.passwordResetTokenHashed = undefined;
    user.passwordResetTokenIssuedAt = undefined;

    await user.save();
  }
}

export { UsersService };
