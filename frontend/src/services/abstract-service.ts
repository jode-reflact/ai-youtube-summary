import type { AuthHeaders } from '@/services/types/auth';
import {
  isErrorResponse,
  type ErrorResponse,
  type HttpMethod,
  type RequestFeedback,
  type SuccessResponse,
} from '@/services/types/common';
import { useAuthStore } from '@/stores/auth.store';

export abstract class AbstractService {
  private static readonly API_BASE_URL = import.meta.env.VITE_API_URL;
  private authStore = useAuthStore();

  private readonly serviceUrlPath: string;
  private readonly i18nPathBase: string;

  abstract API_ROUTES: Record<string, string>;

  protected constructor(serviceUrlPath: string, i18nPath: string) {
    this.serviceUrlPath = serviceUrlPath;
    this.i18nPathBase = `service.${i18nPath}`;
  }

  private async getAuthHeaders(): Promise<AuthHeaders> {
    await this.authStore.refreshIfNeeded();
    return {
      Authorization: `Bearer ${this.authStore.user.accessToken}`,
    };
  }

  protected async buildRequestData<BodyType>(
    bodyPayload: BodyType | null,
    additionalHeaders: Record<string, string> | null,
    method: HttpMethod,
    requireAuth?: boolean
  ): Promise<RequestInit> {
    const requestData: RequestInit = {};
    const headers: HeadersInit = {};

    if (requireAuth) {
      Object.assign(headers, await this.getAuthHeaders());
    }

    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders);
    }

    if (bodyPayload) {
      headers['Content-Type'] = 'application/json';
      requestData['body'] = JSON.stringify(bodyPayload);
    }

    if (Object.keys(headers).length > 0) {
      requestData['headers'] = headers;
    }

    return {
      ...requestData,
      method,
    };
  }

  protected async dispatchRequest<SuccessResponseDataType>(
    apiPath: string,
    requestData: RequestInit,
    i18nPath: string,
    searchParams?: URLSearchParams
  ): Promise<RequestFeedback<SuccessResponseDataType>> {
    try {
      const url: URL = new URL(`${AbstractService.API_BASE_URL}${this.serviceUrlPath}${apiPath}`);

      if (searchParams) {
        url.search = searchParams.toString();
      }

      const response: Response = await fetch(url, requestData);
      if (!response.ok)
        return {
          messagePath: `service.httpError`,
          isError: true,
        };

      const payload: ErrorResponse | SuccessResponse<SuccessResponseDataType> =
        await response.json();

      if (isErrorResponse<SuccessResponseDataType>(payload))
        return {
          messagePath: `service.error.${payload.error.descriptionCode}`,
          isError: true,
        };

      return {
        messagePath: `${this.i18nPathBase}.${i18nPath}.success`,
        isError: false,
        data: payload.data,
      };
    } catch {
      return {
        messagePath: `service.unexpectedError`,
        isError: true,
      };
    }
  }
}
