import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

import { EnvironmentVariables } from '../config/environment-variables';
import { VideoMetadata } from '../common/types/video-metadata';
import { YoutubeApiNotReachableError } from '../common/errors/youtube-api-not-reachable.error';
import { YouTubeVideoApiResponse } from './types/youtube-video-api-response';
import { VideoNotExistsError } from '../common/errors/video-not-exists.error';
import { YouTubeChannelApiResponse } from './types/youtube-channel-api-response';
import { ChannelNotExistsError } from '../common/errors/channel-not-exists.error';
import { ChannelThumbnails } from '../common/types/channel-thumbnails';

@Injectable()
class YoutubeApiConnector {
  private readonly logger = new Logger(YoutubeApiConnector.name);

  private readonly API_KEY = this.configService.get('YOUTUBE_API_KEY', {
    infer: true,
  });

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async getYouTubeVideoMetadata(videoId: string): Promise<VideoMetadata> {
    const baseURL = 'https://www.googleapis.com/youtube/v3/videos';

    const url = new URL(baseURL);
    const params = new URLSearchParams({
      id: videoId,
      key: this.API_KEY,
      part: 'snippet,contentDetails,statistics,status',
    });
    url.search = params.toString();

    let response: AxiosResponse<YouTubeVideoApiResponse>;
    try {
      this.logger.log(
        `🌍 Requesting metadata for YouTube video with id: ${videoId}`,
      );
      response = await axios.get<YouTubeVideoApiResponse>(url.toString());
    } catch (error) {
      throw new YoutubeApiNotReachableError();
    }

    if (response.data.items.length === 0) {
      throw new VideoNotExistsError(videoId);
    }

    const videoMetadata = response.data.items[0];
    return {
      title: videoMetadata.snippet.title,
      publishedAt: videoMetadata.snippet.publishedAt,
      duration: videoMetadata.contentDetails.duration,
      thumbnailUrl: videoMetadata.snippet.thumbnails.medium.url,
      channelId: videoMetadata.snippet.channelId,
      channelTitle: videoMetadata.snippet.channelTitle,
      statistics: {
        viewCount: +videoMetadata.statistics.viewCount,
        likeCount: +videoMetadata.statistics.likeCount,
        favoriteCount: +videoMetadata.statistics.favoriteCount,
        commentCount: +videoMetadata.statistics.commentCount,
      },
    };
  }

  async getYouTubeChannelAvatar(channelId: string): Promise<ChannelThumbnails> {
    const baseURL = 'https://www.googleapis.com/youtube/v3/channels';

    const url = new URL(baseURL);
    const params = new URLSearchParams({
      id: channelId,
      key: this.API_KEY,
      part: 'snippet',
    });
    url.search = params.toString();

    let response: AxiosResponse<YouTubeChannelApiResponse>;
    try {
      this.logger.log(
        `🌍 Requesting metadata for YouTube channel with id: ${channelId}`,
      );
      response = await axios.get<YouTubeChannelApiResponse>(url.toString());
    } catch (error) {
      throw new YoutubeApiNotReachableError();
    }

    if (response.data.items.length === 0) {
      throw new ChannelNotExistsError(channelId);
    }

    const channelMetadata = response.data.items[0];
    return {
      default: channelMetadata.snippet.thumbnails.default,
      medium: channelMetadata.snippet.thumbnails.medium,
      high: channelMetadata.snippet.thumbnails.high,
    };
  }
}

export { YoutubeApiConnector };
