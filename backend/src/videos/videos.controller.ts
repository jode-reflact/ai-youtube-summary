import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { AccessTokenAuthGuard } from '../common/guards/access-token-auth.guard';
import { VideosService } from './videos.service';

@Controller()
@UseGuards(AccessTokenAuthGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('videos/:ytVideoId')
  getVideo(@Param('ytVideoId') ytVideoId: string) {
    return this.videosService.getByYtVideoId(ytVideoId);
  }

  @Get('youtube/is-video-url')
  isValidYtUrl(@Query('url') url: string) {
    return this.videosService.isValidYtUrl(url);
  }
}
