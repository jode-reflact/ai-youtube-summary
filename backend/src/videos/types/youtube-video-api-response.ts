interface YouTubeVideoApiResponse {
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: Date;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        [key: string]: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      tags: string[];
      categoryId: string;
      liveBroadcastContent: string;
      defaultLanguage: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      regionRestriction: {
        allowed: string[];
        blocked: string[];
      };
      contentRating: { [rating: string]: string };
      projection: string;
      hasCustomThumbnail: boolean;
    };
    status: {
      uploadStatus: string;
      failureReason: string;
      rejectionReason: string;
      privacyStatus: string;
      publishAt: Date;
      license: string;
      embeddable: boolean;
      publicStatsViewable: boolean;
      madeForKids: boolean;
      selfDeclaredMadeForKids: boolean;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
}

export { YouTubeVideoApiResponse };
