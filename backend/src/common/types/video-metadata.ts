interface VideoMetadata {
  publishedAt: Date;

  channelId: string;

  channelTitle: string;

  title: string;

  thumbnailUrl: string;

  duration: string;

  statistics: {
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
}

export { VideoMetadata };
