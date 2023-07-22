import type { Video } from '@/services/types/common';

export const filterPendingVideos = (videos: Video[]) =>
  videos.filter((video: Video) => video.summary === undefined);

export const filterFinishedVideos = (videos: Video[]) =>
  videos.filter((video: Video) => video.summary !== undefined);

export const sortVideosByLastUpdated = (videos: Video[]) => {
  const sortedVideos: Video[] = [...videos];
  sortedVideos.sort((a: Video, b: Video) => {
    const aDate: Date = new Date(a.metadata.lastUpdated);
    const bDate: Date = new Date(b.metadata.lastUpdated);

    return bDate.getTime() - aDate.getTime();
  });

  return sortedVideos;
};

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
