import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideosService } from './videos.service';
import { Video, VideoSchema } from './schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
