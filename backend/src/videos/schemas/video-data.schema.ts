import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class VideoData {
  @Prop()
  title: string;

  @Prop()
  thumbnailUrl: string;

  @Prop()
  shortDescription: string;

  @Prop()
  extendedDescription: string;

  @Prop()
  uploadedAt: Date;

  @Prop()
  duration: number;

  @Prop()
  channelTitle: string;
}

const VideoDataSchema = SchemaFactory.createForClass(VideoData);

export { VideoData, VideoDataSchema };
