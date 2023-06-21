import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { AddVideoDto } from './dto/add-video.dto';
import { UsersService } from './users.service';
import { AccessTokenAuthGuard } from '../common/guards/access-token-auth.guard';
import { Video } from '../videos/schemas/video.schema';

@Controller('users')
@UseGuards(AccessTokenAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/videos')
  async getVideos(
    @GetCurrentUserId() userIdToken: string,
    @Param('userId') userIdParam: string,
  ) {
    if (userIdToken !== userIdParam) {
      throw new UnauthorizedException("Provided userId doesn't match token");
    }

    const videos = await this.usersService.getVideos(userIdToken);

    return videos.map((video) => Video.toDTO(video));
  }

  @Post(':userId/videos')
  addVideo(
    @GetCurrentUserId() userIdToken: string,
    @Param('userId') userIdParam: string,
    @Body() addVideoDto: AddVideoDto,
  ) {
    if (userIdToken !== userIdParam) {
      throw new UnauthorizedException("Provided userId doesn't match token");
    }

    return this.usersService.addVideo(userIdToken, addVideoDto.ytVideoUrl);
  }

  @Delete(':userId/videos/:videoId')
  async deleteVideo(
    @GetCurrentUserId() userIdToken: string,
    @Param('userId') userIdParam: string,
    @Param('videoId') videoId: string,
  ) {
    if (userIdToken !== userIdParam) {
      throw new UnauthorizedException("Provided userId doesn't match token");
    }

    await this.usersService.deleteVideo(userIdToken, videoId);
  }
}
