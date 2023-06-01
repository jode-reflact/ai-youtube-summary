import { BusinessError } from './business.error';

class InvalidYouTubeUrlError extends BusinessError {
  constructor() {
    super('Invalid YouTube URL', 'INVALID_YOUTUBE_URL');
  }
}

export { InvalidYouTubeUrlError };
