import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { EmailTakenError } from '../common/errors/email-taken-error';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/environment-variables';

@Injectable()
class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.createUser({ email, password });
    await this.sendConfirmationMail({
      email: user.email,
      confirmationToken: user.confirmationToken,
    });

    return user;
  }

  private async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const passwordHashed = await this.authService.hashPassword(password);
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
}

export { UsersService };
