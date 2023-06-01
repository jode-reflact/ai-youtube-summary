import { BusinessError } from './business.error';

class VideoAlreadyAddedError extends BusinessError {
  constructor(videoId: string) {
    super(`Video with id ${videoId} is already added`, 'VIDEO_ALREADY_ADDED');
  }
}

export { VideoAlreadyAddedError };
