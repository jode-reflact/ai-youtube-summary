import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { VideoData, VideoDataSchema } from './video-data.schema';

type VideoDocument = HydratedDocument<Video>;

@Schema()
class Video {
  id: Types.ObjectId;

  @Prop({ required: true })
  ytVideoId: string;

  @Prop({ type: VideoDataSchema })
  data?: VideoData;
}

const VideoSchema = SchemaFactory.createForClass(Video);

export { VideoDocument, Video, VideoSchema };
