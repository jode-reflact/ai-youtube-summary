import { AbstractService } from '@/services/abstract-service';
import type { IsValidYtUrlResponseBody } from '@/services/types/videos';
import type { Video } from '@/services/types/common';

export class VideosService extends AbstractService {
  API_ROUTES = {
    getVideo: 'videos',
    isValidYtUrl: 'youtube/is-video-url',
  };

  constructor() {
    super('', 'videos');
  }

  public async getVideo(ytVideoId: string) {
    return await super.dispatchRequest<Video>(
      `${this.API_ROUTES.getVideo}/${ytVideoId}`,
      await super.buildRequestData(null, null, 'GET', true),
      'getVideo'
    );
  }

  public async isValidYtUrl(ytVideoUrl: string) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append('url', ytVideoUrl);

    return await super.dispatchRequest<IsValidYtUrlResponseBody>(
      this.API_ROUTES.isValidYtUrl,
      await super.buildRequestData(null, null, 'GET', true),
      'isValidYtUrl',
      searchParams
    );
  }
}
