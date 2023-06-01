import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { EmailTakenError } from '../common/errors/email-taken.error';
import { UserNotFoundError } from '../common/errors/user-not-found.error';
import { VideoAlreadyAddedError } from '../common/errors/video-already-added.error';
import { VideosService } from '../videos/videos.service';
import { Video } from '../videos/schemas/video.schema';

@Injectable()
class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly videosService: VideosService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user == null) {
      throw new UserNotFoundError(email);
    }

    return user;
  }

  async findUserById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new UserNotFoundError(id);
    }

    const user = await this.userModel.findById(id).exec();
    if (user == null) {
      throw new UserNotFoundError(id);
    }

    return user;
  }

  async createUser({
    email,
    passwordHash,
    confirmationTokenHash,
    confirmationTokenIssuedAt,
  }: {
    email: string;
    passwordHash: string;
    confirmationTokenHash: string;
    confirmationTokenIssuedAt: Date;
  }): Promise<string> {
    const user = new this.userModel({
      email,
      passwordHash,
      confirmationTokenHash,
      confirmationTokenIssuedAt,
      registeredAt: new Date(),
    });

    try {
      await user.save();
    } catch (error) {
      if (this.isEmailTakenError(error)) {
        throw new EmailTakenError(email);
      }
      throw error;
    }

    return user.id.toString();
  }

  async saveUserConfirmationToken({
    userId,
    confirmationTokenHash,
    confirmationTokenIssuedAt,
  }: {
    userId: string;
    confirmationTokenHash: string;
    confirmationTokenIssuedAt: Date;
  }) {
    const user = await this.userModel.findById(userId).exec();

    user.confirmationTokenHash = confirmationTokenHash;
    user.confirmationTokenIssuedAt = confirmationTokenIssuedAt;

    await user.save();
  }

  async savePasswordResetToken({
    userId,
    passwordResetTokenHash,
    passwordResetTokenIssuedAt,
  }: {
    userId: string;
    passwordResetTokenHash: string;
    passwordResetTokenIssuedAt: Date;
  }) {
    const user = await this.userModel.findById(userId).exec();
    if (user == null) {
      throw new UserNotFoundError(userId);
    }

    user.passwordResetTokenHash = passwordResetTokenHash;
    user.passwordResetTokenIssuedAt = passwordResetTokenIssuedAt;

    await user.save();
  }

  async saveRefreshToken(userId: string, refreshTokenHash: string) {
    const user = await this.userModel.findById(userId).exec();

    user.refreshTokenHash = refreshTokenHash;

    await user.save();
  }

  async confirmUser(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    user.isConfirmed = true;
    user.confirmationTokenHash = undefined;
    user.confirmationTokenIssuedAt = undefined;

    await user.save();
  }

  async savePassword(userId: string, passwordHash: string) {
    const user = await this.userModel.findById(userId).exec();

    user.passwordHash = passwordHash;
    user.passwordResetTokenHash = undefined;
    user.passwordResetTokenIssuedAt = undefined;
    user.refreshTokenHash = undefined;

    await user.save();
  }

  async deleteRefreshToken(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (user == undefined) return;

    user.refreshTokenHash = undefined;

    await user.save();
  }

  async addVideo(userId: string, ytVideoUrl: string) {
    const user = await this.userModel.findById(userId).exec();
    if (user == null) {
      throw new UserNotFoundError(userId);
    }

    const videoId = await this.videosService.addVideo(ytVideoUrl);

    if (user.videos.includes(videoId)) {
      throw new VideoAlreadyAddedError(videoId.toString());
    }

    user.videos.push(videoId);
    await user.save();
  }

  async getVideos(userId: string) {
    const videos = (
      await this.userModel.findById(userId).populate('videos').exec()
    ).videos as unknown as Video[];

    return videos.map((video: Video) => Video.toDTO(video));
  }

  private isEmailTakenError(error: any) {
    return error.code === 11000;
  }
}

export { UsersService };
