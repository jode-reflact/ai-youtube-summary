import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { EmailTakenError } from '../common/errors/email-taken-error';
import { AuthService } from '../auth/auth.service';

@Injectable()
class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async register({ email, password }: { email: string; password: string }) {
    const user = await this.createUser({ email, password });
    // TODO: send registration mail to user

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
}

export { UsersService };
