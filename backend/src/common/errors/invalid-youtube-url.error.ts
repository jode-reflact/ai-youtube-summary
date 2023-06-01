import { BusinessError } from './business.error';

class InvalidYtUrlError extends BusinessError {
  constructor() {
    super('Invalid YouTube URL', 'INVALID_YOUTUBE_URL');
  }
}

export { InvalidYtUrlError };
