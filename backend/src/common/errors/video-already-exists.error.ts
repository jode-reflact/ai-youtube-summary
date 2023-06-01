import { BusinessError } from './business.error';

class VideoAlreadyExistsError extends BusinessError {
  constructor(videoId: string) {
    super(`Video with id ${videoId} already exists`, 'VIDEO_ALREADY_EXISTS');
  }
}

export { VideoAlreadyExistsError };
