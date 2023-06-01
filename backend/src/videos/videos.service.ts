import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Video, VideoDocument } from './schemas/video.schema';
import { validateYtVideoUrl } from '../common/validators/yt-video-url.validator';
import { extractYtVideoId } from '../common/util/extract-yt-video-id';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async addVideo(ytVideoUrl: string): Promise<Types.ObjectId> {
    validateYtVideoUrl(ytVideoUrl);

    const ytVideoId = extractYtVideoId(ytVideoUrl);

    let video = await this.videoModel.findOne({ ytVideoId }).exec();
    if (video == undefined) {
      video = new this.videoModel({ ytVideoId });
      await video.save();
    }

    return video.id;
  }
}
