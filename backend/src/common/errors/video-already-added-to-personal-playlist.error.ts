import { BusinessError } from './business.error';

class VideoAlreadyAddedToPersonalPlaylistError extends BusinessError {
  constructor(videoId: string) {
    super(
      `Video with id ${videoId} is already added to your personal playlist`,
      'VIDEO_ALREADY_ADDED_TO_PERSONAL_PLAYLIST',
    );
  }
}

export { VideoAlreadyAddedToPersonalPlaylistError };
