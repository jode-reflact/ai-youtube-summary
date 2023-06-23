export interface ErrorResponse {
  error: {
    timestamp: Date;
    message: string;
    path: string;
    descriptionCode: string;
  };
}

export interface SuccessResponse<DataType> {
  data: DataType;
}

export type HttpMethod = 'GET' | 'POST';

export interface RequestFeedback<DataType> {
  messagePath: string;
  isError: boolean;
  data?: DataType;
}

export const isErrorResponse = <SuccessResponseDataType>(
  response: ErrorResponse | SuccessResponse<SuccessResponseDataType>
): response is ErrorResponse => Object.keys(response).includes('error');

export interface VideoStatistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

export interface VideoMetadata {
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  title: string;
  thumbnailUrl: string;
  durationInSeconds: number;
  statistics: VideoStatistics;
  lastUpdated: string;
  channelAvatarUrl: string;
}

export interface Video {
  id: string;
  ytVideoId: string;
  metadata: VideoMetadata;
  summary?: string;
}
