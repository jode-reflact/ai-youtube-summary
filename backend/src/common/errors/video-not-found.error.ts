import { BusinessError } from './business.error';

class VideoNotFoundError extends BusinessError {
  constructor(videoId: string) {
    super(`Video with id ${videoId} not found`, 'VIDEO_NOT_FOUND');
  }
}

export { VideoNotFoundError };
