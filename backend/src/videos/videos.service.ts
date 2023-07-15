import { Model, Types } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Video, VideoDocument } from './schemas/video.schema';
import { extractYtVideoId } from '../common/util/extract-yt-video-id';
import { YoutubeApiConnector } from './youtube-api.connector';
import { VideoNotFoundError } from '../common/errors/video-not-found.error';
import { VideoAlreadyExistsError } from '../common/errors/video-already-exists.error';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class VideosService {
  private readonly logger = new Logger(VideosService.name);

  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
    private readonly youtubeApiConnector: YoutubeApiConnector,
    @InjectQueue('video-summary')
    private readonly videoSummaryQueue: Queue,
  ) {}

  async fillSummary(videoId: string, summary: string) {
    const video = await this.videoModel.findById(videoId).exec();
    if (video == undefined) {
      throw new VideoNotFoundError(videoId);
    }

    video.summary = summary;
    await video.save();
  }

  async getSummary(videoId: string) {
    return (await this.videoModel.findById(videoId).select('summary').exec())
      .summary;
  }

  async getByYtVideoIdOrCreateVideo(ytVideoId: string) {
    try {
      return await this.getByYtVideoId(ytVideoId);
    } catch (error) {
      if (error instanceof VideoNotFoundError) {
        return await this.createVideo(ytVideoId);
      }

      throw error;
    }
  }

  async addVideo(ytVideoUrl: string): Promise<Types.ObjectId> {
    const ytVideoId = extractYtVideoId(ytVideoUrl);

    const videoExists = await this.videoModel.findOne({ ytVideoId }).exec();
    if (videoExists) {
      throw new VideoAlreadyExistsError(videoExists._id);
    }

    const video = await this.createVideo(ytVideoId);
    const job = await this.videoSummaryQueue.add({
      videoId: video.id,
      youtubeUrl: ytVideoUrl,
    });

    return video.id;
  }

  async isValidYtUrl(url: string) {
    try {
      const ytVideoId = extractYtVideoId(url);
      return { isValidYtUrl: true, ytVideoId };
    } catch (error) {
      return { isValidYtUrl: false };
    }
  }

  private async getByYtVideoId(ytVideoId: string) {
    const video = await this.videoModel.findOne({ ytVideoId }).exec();
    if (video == undefined) {
      throw new VideoNotFoundError(ytVideoId);
    }

    return video;
  }

  private async createVideo(ytVideoId: string) {
    const video = new this.videoModel({ ytVideoId });
    const metadata = await this.youtubeApiConnector.getYouTubeVideoMetadata(
      ytVideoId,
    );
    const channelAvatar =
      await this.youtubeApiConnector.getYouTubeChannelAvatar(
        metadata.channelId,
      );
    video.metadata = {
      ...metadata,
      channelAvatarUrl: channelAvatar.medium.url,
      lastUpdated: new Date(),
    };
    await video.save();

    return video;
  }
}
