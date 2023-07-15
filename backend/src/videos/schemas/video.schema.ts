import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { VideoMetadataSchema, VideoMetadata } from './video-metadata.schema';

type VideoDocument = HydratedDocument<Video>;

@Schema()
class Video {
  id: string;

  @Prop({ required: true })
  ytVideoId: string;

  @Prop({ type: VideoMetadataSchema })
  metadata: VideoMetadata;

  @Prop()
  summary: string;

  static toDTO(video: Video) {
    return {
      id: video.id,
      ytVideoId: video.ytVideoId,
      metadata: video.metadata,
      summary: video.summary,
    };
  }
}

const VideoSchema = SchemaFactory.createForClass(Video);

export { VideoDocument, Video, VideoSchema };
