import { BusinessError } from './business.error';

class VideoNotExistsError extends BusinessError {
  constructor(ytVideoId: string) {
    super(
      `Video with YouTube id '${ytVideoId}' does not exist`,
      'VIDEO_NOT_EXISTS',
    );
  }
}

export { VideoNotExistsError };
