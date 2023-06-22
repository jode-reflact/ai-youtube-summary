interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface Snippet {
  thumbnails: Thumbnails;
}

interface Item {
  snippet: Snippet;
}

interface YouTubeChannelApiResponse {
  items: Item[];
}

export { YouTubeChannelApiResponse };
