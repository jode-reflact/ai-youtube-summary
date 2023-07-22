import { AbstractService } from '@/services/abstract-service';
import type { AddVideoRequestBody } from '@/services/types/users';
import type { Video } from '@/services/types/common';

export class UsersService extends AbstractService {
  API_ROUTES = {
    getVideos: '/videos',
    addVideo: '/videos',
  };

  constructor(userId: string) {
    super(`/users/${userId}`, 'users');
  }

  public async getVideos() {
    return await super.dispatchRequest<Video[]>(
      `${this.API_ROUTES.getVideos}`,
      await super.buildRequestData(null, null, 'GET', true),
      'getVideos'
    );
  }

  public async addVideo(ytVideoUrl: string) {
    const body: AddVideoRequestBody = { ytVideoUrl };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.addVideo,
      await super.buildRequestData<AddVideoRequestBody>(body, null, 'POST', true),
      'addVideo'
    );
  }
}
