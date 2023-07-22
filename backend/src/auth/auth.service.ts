import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';

import { EmailNotConfirmedError } from '../common/errors/email-not-confirmed.error';
import { InvalidCredentialsError } from '../common/errors/invalid-credentials.error';
import { InvalidEmailError } from '../common/errors/invalid-email.error';
import { InvalidPasswordError } from '../common/errors/invalid-password.error';
import { InvalidTokenError } from '../common/errors/invalid-token.error';
import { TokenExpiredError } from '../common/errors/token-expired.error';
import { UserAlreadyConfirmedError } from '../common/errors/user-already-confirmed.error';
import { isExpired } from '../common/util/is-expired';
import { EnvironmentVariables } from '../config/environment-variables';
import { MailService } from '../mail/mail.service';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload } from './types/access-token-payload';
import { RefreshTokenPayload } from './types/refresh-token-payload';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = this.configService.get('JWT_SECRET', {
    infer: true,
  });
  private readonly ACCESS_TOKEN_EXPIRES_IN = this.configService.get(
    'ACCESS_TOKEN_EXPIRES_IN',
    { infer: true },
  );
  private readonly REFRESH_TOKEN_EXPIRES_IN = this.configService.get(
    'REFRESH_TOKEN_EXPIRES_IN',
    { infer: true },
  );
  private readonly FRONTEND_HOST = this.configService.get('FRONTEND_HOST', {
    infer: true,
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) { }

  async login(enteredCredentials: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findUserByEmail(
      enteredCredentials.email,
    );

    await this.validateEmailConfirmation(user);
    await this.validateEnteredCredentials(user, enteredCredentials);

    return this.createLoginTokens(user);
  }

  async logout(userId: string) {
    await this.usersService.deleteRefreshToken(userId);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);

    await this.validateRefreshToken(user, refreshToken);

    return this.createLoginTokens(user);
  }

  async register({ email, password }: { email: string; password: string }) {
    this.validateEnteredEmail(email);
    this.validateEnteredPassword(password);

    const passwordHash = await this.hash(password);
    const {
      confirmationToken,
      confirmationTokenHash,
      confirmationTokenIssuedAt,
    } = await this.buildConfirmationTokenData();

    const userId = await this.usersService.createUser({
      email,
      passwordHash,
      confirmationTokenHash,
      confirmationTokenIssuedAt,
    });

    await this.sendConfirmationMail({ email, userId, confirmationToken });
  }

  async confirmEmail(userId: string, confirmationToken: string) {
    const user = await this.usersService.findUserById(userId);

    await this.validateConfirmationToken(user, confirmationToken);

    await this.usersService.confirmUser(user.id.toString());
  }

  async resendConfirmationLink(email: string) {
    const { confirmationToken, userId } = await this.renewConfirmationToken(
      email,
    );

    await this.sendConfirmationMail({ email, userId, confirmationToken });
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const userId = user.id.toString();

    const {
      passwordResetToken,
      passwordResetTokenHash,
      passwordResetTokenIssuedAt,
    } = await this.buildPasswordResetTokenData();

    await this.usersService.savePasswordResetToken({
      userId,
      passwordResetTokenHash,
      passwordResetTokenIssuedAt,
    });

    await this.sendRequestPasswordResetMail({
      email,
      userId,
      passwordResetToken,
    });
  }

  async resetPassword({
    userId,
    passwordResetToken,
    newPassword,
  }: {
    userId: string;
    passwordResetToken: string;
    newPassword: string;
  }) {
    const user = await this.usersService.findUserById(userId);

    this.validateEnteredPassword(newPassword);
    await this.validatePasswordResetToken(user, passwordResetToken);

    const passwordHash = await this.hash(newPassword);

    await this.usersService.savePassword(user.id.toString(), passwordHash);
  }

  private async validateEmailConfirmation(user: User) {
    if (user.isConfirmed) return;
    throw new EmailNotConfirmedError(user.email);
  }

  private async validateEnteredCredentials(
    user: User,
    enteredCredentials: {
      email: string;
      password: string;
    },
  ) {
    const passwordMatch = await this.verifyHashes(
      user.passwordHash,
      enteredCredentials.password,
    );

    if (passwordMatch) return;
    throw new InvalidCredentialsError();
  }

  private hash(password: string) {
    return argon2.hash(password);
  }

  private verifyHashes(hash: string, plain: string) {
    return argon2.verify(hash, plain);
  }

  private async generateLoginTokens({
    userId,
    email,
  }: {
    userId: string;
    email: string;
  }) {
    const accessTokenPayload: AccessTokenPayload = {
      sub: userId,
      email,
    };
    const refreshTokenPayload: RefreshTokenPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(accessTokenPayload),
      this.generateRefreshToken(refreshTokenPayload),
    ]);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      secret: this.JWT_SECRET,
    });
  }

  private generateRefreshToken(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      secret: this.JWT_SECRET,
    });
  }

  private async buildConfirmationTokenData() {
    const { token, tokenHash, issuedAt } = await this.generateToken();

    return {
      confirmationToken: token,
      confirmationTokenHash: tokenHash,
      confirmationTokenIssuedAt: issuedAt,
    };
  }

  private async buildPasswordResetTokenData() {
    const { token, tokenHash, issuedAt } = await this.generateToken();

    return {
      passwordResetToken: token,
      passwordResetTokenHash: tokenHash,
      passwordResetTokenIssuedAt: issuedAt,
    };
  }

  private async generateToken() {
    const token = randomUUID();
    const tokenHash = await this.hash(token);
    const issuedAt = new Date();

    return { token, tokenHash, issuedAt };
  }

  private validateEnteredEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) return;

    throw new InvalidEmailError(email);
  }

  private validateEnteredPassword(password: string) {
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
    const confirmationLink = new URL(this.FRONTEND_HOST + `/#/auth/confirm-registration?userId=${userId}&token=${confirmationToken}`);
    /*
    const confirmationLink = new URL(this.FRONTEND_HOST);
    confirmationLink.pathname = '/auth/confirm-registration';
    confirmationLink.searchParams.append('userId', userId);
    confirmationLink.searchParams.append('token', confirmationToken);
    */

    return confirmationLink.toString();
  }

  private async sendRequestPasswordResetMail({
    email,
    userId,
    passwordResetToken,
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
    const passwordResetLink = new URL(this.FRONTEND_HOST + `/#/auth/reset-password?userId=${userId}&token=${passwordResetToken}`);
    /*
    const passwordResetLink = new URL(this.FRONTEND_HOST);
    passwordResetLink.pathname = '/auth/reset-password';
    passwordResetLink.searchParams.append('userId', userId);
    passwordResetLink.searchParams.append('token', passwordResetToken);
    */

    return passwordResetLink.toString();
  }

  private async validateConfirmationToken(
    user: User,
    confirmationToken: string,
  ) {
    if (user.isConfirmed) {
      throw new UserAlreadyConfirmedError(user.email);
    }

    const confirmationTokenMatch = await this.verifyHashes(
      user.confirmationTokenHash,
      confirmationToken,
    );
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

  private async renewConfirmationToken(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const userId = user.id.toString();

    if (user.isConfirmed) {
      throw new UserAlreadyConfirmedError(email);
    }

    const {
      confirmationToken,
      confirmationTokenHash,
      confirmationTokenIssuedAt,
    } = await this.buildConfirmationTokenData();

    await this.usersService.saveUserConfirmationToken({
      userId,
      confirmationTokenHash,
      confirmationTokenIssuedAt,
    });

    return {
      userId,
      confirmationToken,
    };
  }

  private async validatePasswordResetToken(
    user: User,
    passwordResetToken: string,
  ) {
    const passwordResetTokenMatch = await this.verifyHashes(
      user.passwordResetTokenHash,
      passwordResetToken,
    );
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

  private async validateRefreshToken(user: User, refreshToken: string) {
    if (!user.refreshTokenHash) {
      throw new InvalidTokenError();
    }

    const refreshTokenMatch = await this.verifyHashes(
      user.refreshTokenHash,
      refreshToken,
    );
    if (!refreshTokenMatch) {
      await this.usersService.deleteRefreshToken(user.id.toString());
      throw new InvalidTokenError();
    }
  }

  private async createLoginTokens(user: User) {
    const loginTokens = await this.generateLoginTokens({
      email: user.email,
      userId: user.id.toString(),
    });
    const refreshTokenHash = await this.hash(loginTokens.refreshToken);

    await this.usersService.saveRefreshToken(
      user.id.toString(),
      refreshTokenHash,
    );

    return loginTokens;
  }
}
