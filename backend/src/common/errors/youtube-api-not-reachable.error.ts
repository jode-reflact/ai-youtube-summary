import { BusinessError } from './business.error';

class YoutubeApiNotReachableError extends BusinessError {
  constructor() {
    super('Youtube API not reachable', 'YOUTUBE_API_NOT_REACHABLE');
  }
}

export { YoutubeApiNotReachableError };
