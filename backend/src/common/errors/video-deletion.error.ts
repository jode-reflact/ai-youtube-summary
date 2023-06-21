import { BusinessError } from './business.error';

class VideoDeletionError extends BusinessError {
  constructor(videoId: string) {
    super(
      `Video with id ${videoId} cannot be deleted.`,
      'VIDEO_DELETION_ERROR',
    );
  }
}

export { VideoDeletionError };
