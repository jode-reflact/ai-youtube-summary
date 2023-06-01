import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { VideoMetadataSchema, VideoMetadata } from './video-metadata.schema';

type VideoDocument = HydratedDocument<Video>;

@Schema()
class Video {
  id: Types.ObjectId;

  @Prop({ required: true })
  ytVideoId: string;

  @Prop({ type: VideoMetadataSchema })
  metadata: VideoMetadata;

  static toDTO(video: Video) {
    return {
      id: video.id,
      ytVideoId: video.ytVideoId,
      metadata: video.metadata,
    };
  }
}

const VideoSchema = SchemaFactory.createForClass(Video);

export { VideoDocument, Video, VideoSchema };
