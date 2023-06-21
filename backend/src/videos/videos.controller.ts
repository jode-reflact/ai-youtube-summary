import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { AccessTokenAuthGuard } from '../common/guards/access-token-auth.guard';
import { VideosService } from './videos.service';
import { Video } from './schemas/video.schema';

@Controller()
@UseGuards(AccessTokenAuthGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('videos/:ytVideoId')
  async getVideo(@Param('ytVideoId') ytVideoId: string) {
    const video = await this.videosService.getByYtVideoIdOrCreateVideo(
      ytVideoId,
    );
    return Video.toDTO(video);
  }

  @Get('youtube/is-video-url')
  isValidYtUrl(@Query('url') url: string) {
    return this.videosService.isValidYtUrl(url);
  }
}
