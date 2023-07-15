import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideosService } from './videos.service';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosController } from './videos.controller';
import { YoutubeApiConnector } from './youtube-api.connector';
import { VideoSummaryProcessor } from './video-summary.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    BullModule.registerQueue({
      name: 'video-summary',
    }),
  ],
  providers: [VideosService, YoutubeApiConnector, VideoSummaryProcessor],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
