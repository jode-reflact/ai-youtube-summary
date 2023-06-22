interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface ChannelThumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export { ChannelThumbnails };
