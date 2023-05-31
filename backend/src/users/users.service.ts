import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

@Injectable()
class UsersService {
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

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    await this.validateEmailConfirmation({ email });
    await this.validateCredentials({ email, password });

    return this.generateLoginTokens({ email });
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    const user = await this.createUser({ email, password });
    await this.sendConfirmationMail({
      email: user.email,
      confirmationToken: user.confirmationToken,
    });
  }

  private async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    this.validateEmail(email);
    this.validatePassword(password);

    const passwordHashed = await this.authService.hash(password);
    const confirmationTokenData = await this.buildConfirmationTokenData();

    const user = new this.userModel({
      email,
      passwordHashed,
      registeredAt: new Date(),
      ...confirmationTokenData,
    });

    try {
      await user.save();
    } catch (error) {
      if (this.isEmailTakenError(error)) {
        throw new EmailTakenError(email);
      }
      throw error;
    }

    return user;
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
    confirmationToken,
  }: {
    email: string;
    confirmationToken: string;
  }) {
    const FRONTEND_HOST = this.configService.get('FRONTEND_HOST', {
      infer: true,
    });
    const confirmationLink = new URL(FRONTEND_HOST);
    confirmationLink.pathname = '/confirm-registration';
    confirmationLink.searchParams.append('token', confirmationToken);

    await this.mailService.sendRegistrationMail({
      email,
      confirmationLink: confirmationLink.toString(),
    });
  }

  private async validateEmailConfirmation({ email }: { email: string }) {
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

    const passwordMatch = await this.authService.comparePasswords(
      password,
      user.passwordHashed,
    );
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }
  }

  private async generateLoginTokens({ email }: { email: string }) {
    const user = await this.findUserByEmail(email);

    const { accessToken, refreshToken } =
      await this.authService.generateLoginTokens({
        userId: user._id.toString(),
        email,
      });

    await this.saveRefreshTokenHashed({ user, refreshToken });

    return { accessToken, refreshToken };
  }

  private async saveRefreshTokenHashed({
    user,
    refreshToken,
  }: {
    user: UserDocument;
    refreshToken: string;
  }) {
    user.refreshTokenHashed = await this.authService.hash(refreshToken);
    await user.save();
  }
}

export { UsersService };
