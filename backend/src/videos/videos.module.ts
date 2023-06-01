import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideosService } from './videos.service';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosController } from './videos.controller';
import { YoutubeApiConnector } from './youtube-api.connector';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  providers: [VideosService, YoutubeApiConnector],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
