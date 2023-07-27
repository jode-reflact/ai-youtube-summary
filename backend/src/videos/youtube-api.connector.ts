import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

import { ChannelNotExistsError } from '../common/errors/channel-not-exists.error';
import { VideoNotExistsError } from '../common/errors/video-not-exists.error';
import { YoutubeApiNotReachableError } from '../common/errors/youtube-api-not-reachable.error';
import { ChannelThumbnails } from '../common/types/channel-thumbnails';
import { VideoMetadata } from '../common/types/video-metadata';
import { EnvironmentVariables } from '../config/environment-variables';
import { YouTubeChannelApiResponse } from './types/youtube-channel-api-response';
import { YouTubeVideoApiResponse } from './types/youtube-video-api-response';

@Injectable()
class YoutubeApiConnector {
  private readonly logger = new Logger(YoutubeApiConnector.name);

  private readonly API_KEY = this.configService.get('YOUTUBE_API_KEY', {
    infer: true,
  });

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) { }

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

    // commentCount is NaN for videos with disabled comments --> set count to 0 then
    let commentCount = +videoMetadata.statistics.commentCount;
    if (isNaN(commentCount)) {
      commentCount = 0;
    }

    return {
      title: videoMetadata.snippet.title,
      publishedAt: videoMetadata.snippet.publishedAt,
      durationInSeconds: this.convertDurationToMilliseconds(
        videoMetadata.contentDetails.duration,
      ),
      thumbnailUrl: videoMetadata.snippet.thumbnails.medium.url,
      channelId: videoMetadata.snippet.channelId,
      channelTitle: videoMetadata.snippet.channelTitle,
      statistics: {
        viewCount: +videoMetadata.statistics.viewCount,
        likeCount: +videoMetadata.statistics.likeCount,
        favoriteCount: +videoMetadata.statistics.favoriteCount,
        commentCount: commentCount,
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

  private convertDurationToMilliseconds(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    // Hours, minutes and seconds are optional
    const [hours, minutes, seconds] = match.slice(1).map((value) => {
      if (value != null) {
        // Remove the letters (H, M, or S) from the string
        return parseFloat(value.replace(/\D/g, ''));
      }

      return 0;
    });

    return hours * 60 * 60 + minutes * 60 + seconds;
  }
}

export { YoutubeApiConnector };
