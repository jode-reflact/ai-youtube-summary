import type { Video } from '@/services/types/common';

export const filterPendingVideos = (videos: Video[]) =>
  videos.filter((video: Video) => video.summary === undefined);

export const filterFinishedVideos = (videos: Video[]) =>
  videos.filter((video: Video) => video.summary !== undefined);

export const getChannelUrlById = (ytChannelId: string) =>
  new URL(`channel/${ytChannelId}`, 'https://www.youtube.com');

export const getVideoUrlById = (ytVideoUrl: string) =>
  new URL(`watch/${ytVideoUrl}`, 'https://www.youtube.com');

export const filterVideosByTitle = (searchString: string, videos: Video[]) =>
  videos.filter(
    (video: Video) =>
      video.summary !== undefined &&
      video.metadata.title.toLowerCase().includes(searchString.toLowerCase())
  );
