import type { SummaryItem } from '../../dummy/summaries';
import { summaryItems } from '../../dummy/summaries';

export type ItemsByPlaylist = {
  [playlistName: string]: SummaryItem[];
};

const groupItemsByPlaylist = (items: SummaryItem[]) => {
  const groupedItems: ItemsByPlaylist = {};
  items.forEach((item: SummaryItem) => {
    const playlistName: string = item.playlist;
    if (!groupedItems[playlistName]) {
      groupedItems[playlistName] = [];
    }
    groupedItems[playlistName].push(item);
  });
  return groupedItems;
};

export const fetchPlaylists = () => {
  return groupItemsByPlaylist(summaryItems);
};
