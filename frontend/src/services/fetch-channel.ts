import { type ChannelItem, channelItems } from '../../dummy/channels';

export const fetchChannel = (channelId: string) =>
  channelItems.find((item: ChannelItem) => item.id === channelId);
