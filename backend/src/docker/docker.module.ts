import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'src/videos/schemas/video.schema';
import { DockerService } from './docker.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ],
    providers: [DockerService],
    exports: [DockerService],
})
export class DockerModule { }