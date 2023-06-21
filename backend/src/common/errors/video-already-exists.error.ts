import { Types } from 'mongoose';

import { BusinessError } from './business.error';

class VideoAlreadyExistsError extends BusinessError {
  constructor(public readonly videoId: Types.ObjectId) {
    super(
      `Video with id ${videoId.toString()} already exists`,
      'VIDEO_ALREADY_EXISTS',
    );
  }
}

export { VideoAlreadyExistsError };
