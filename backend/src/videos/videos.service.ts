import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Video, VideoDocument } from './schemas/video.schema';
import { InvalidYouTubeUrlError as InvalidYtUrlError } from '../common/errors/invalid-youtube-url.error';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async addVideo(ytVideoUrl: string): Promise<Types.ObjectId> {
    this.validateYtVideoUrl(ytVideoUrl);
    const ytVideoId = this.extractYtVideoId(ytVideoUrl);

    let video = await this.videoModel.findOne({ ytVideoId }).exec();
    if (video == undefined) {
      video = new this.videoModel({ ytVideoId });
      await video.save();
    }

    return video.id;
  }

  private validateYtVideoUrl(ytVideoUrl: string) {
    // Check if it's a valid URL first
    let url: URL;
    try {
      url = new URL(ytVideoUrl);
    } catch (_) {
      throw new InvalidYtUrlError();
    }

    // Check if the domain is youtube.com or youtu.be
    if (!['www.youtube.com', 'youtu.be'].includes(url.hostname)) {
      throw new InvalidYtUrlError();
    }
  }

  private extractYtVideoId(ytVideoUrl: string) {
    // Extract video id from the URL path
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = ytVideoUrl.match(regExp);
    const videoId = match && match[2].length == 11 ? match[2] : null;

    if (videoId == null) throw new InvalidYtUrlError();

    return videoId;
  }
}
