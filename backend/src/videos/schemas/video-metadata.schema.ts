import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class VideoStatistics {
  @Prop({ required: true })
  viewCount: number;

  @Prop({ required: true })
  likeCount: number;

  @Prop({ required: true })
  favoriteCount: number;

  @Prop({ required: true })
  commentCount: number;
}

const VideoStatisticsSchema = SchemaFactory.createForClass(VideoStatistics);

@Schema({ _id: false })
class VideoMetadata {
  @Prop({ required: true })
  publishedAt: Date;

  @Prop({ required: true })
  channelId: string;

  @Prop({ required: true })
  channelTitle: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, type: VideoStatisticsSchema })
  statistics: VideoStatistics;

  @Prop({ required: true })
  lastUpdated: Date;
}

const VideoMetadataSchema = SchemaFactory.createForClass(VideoMetadata);

export { VideoMetadata, VideoMetadataSchema };
