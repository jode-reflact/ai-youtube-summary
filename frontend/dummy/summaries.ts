export interface SummaryItem {
  id: string;
  thumbnailSrc: string;
  title: string;
  summary: string;
  addedDate: Date;
  durationMilliseconds: number;
  playlist: string;
  channelId: string;
  url: string;
  uploadedDate: Date;
}

const dummySummary: string =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const getRandomDate = () => new Date(new Date().getMilliseconds() - Math.random() * 1e12);

export const summaryItems: SummaryItem[] = [
  {
    id: '1',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 1',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'Watch later',
    channelId: '1',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
  {
    id: '2',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 2',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'Watch later',
    channelId: '2',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
  {
    id: '3',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 3',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'Watch later',
    channelId: '3',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
  {
    id: '4',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 4',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'Watch later',
    channelId: '1',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
  {
    id: '5',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 5',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'Watch later',
    channelId: '2',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
  {
    id: '6',
    thumbnailSrc: 'https://picsum.photos/1024/768',
    title: 'Video 6',
    summary: dummySummary,
    addedDate: getRandomDate(),
    durationMilliseconds: Math.floor(Math.random() * 120_000) + 1,
    playlist: 'My favourite videos',
    channelId: '3',
    url: 'https://www.google.com',
    uploadedDate: getRandomDate(),
  },
];
