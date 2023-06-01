import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { AddVideoDto } from './dto/add-video.dto';
import { UsersService } from './users.service';
import { AccessTokenAuthGuard } from '../common/guards/access-token-auth.guard';

@Controller('users')
@UseGuards(AccessTokenAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
