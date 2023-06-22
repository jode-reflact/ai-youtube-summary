import { BusinessError } from './business.error';

class ChannelNotExistsError extends BusinessError {
  constructor(channelId: string) {
    super(
      `Channel with id '${channelId}' does not exist`,
      'CHANNEL_NOT_EXISTS',
    );
  }
}

export { ChannelNotExistsError };
