import { AbstractService } from '@/services/abstract-service';
import type {
  AuthSuccessResponseBody,
  ConfirmRequestBody,
  ResetPasswordRequestBody,
  UserCredentialsRequestBody,
  UserEmailRequestBody,
} from '@/services/types/auth';

export class AuthService extends AbstractService {
  API_ROUTES = {
    register: 'register',
    resendConfirmationLink: 'resend-confirmation-link',
    confirm: 'confirm',
    login: 'login',
    requestPasswordReset: 'request-password-reset',
    resetPassword: 'reset-password',
    logout: 'logout',
    refresh: 'refresh',
  };

  constructor() {
    super('auth', 'auth');
  }

  public async register(email: string, password: string) {
    const requestBody: UserCredentialsRequestBody = {
      email,
      password,
    };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.register,
      await super.buildRequestData<UserCredentialsRequestBody>(requestBody, null, 'POST'),
      'register'
    );
  }

  public async confirm(userId: string, confirmationToken: string) {
    const requestBody: ConfirmRequestBody = {
      userId,
      confirmationToken,
    };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.confirm,
      await super.buildRequestData<ConfirmRequestBody>(requestBody, null, 'POST'),
      'confirm'
    );
  }

  public async resendConfirmationLink(email: string) {
    const requestBody: UserEmailRequestBody = {
      email,
    };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.resendConfirmationLink,
      await super.buildRequestData<UserEmailRequestBody>(requestBody, null, 'POST'),
      'resendConfirmationLink'
    );
  }

  public async login(email: string, password: string) {
    const requestBody: UserCredentialsRequestBody = {
      email,
      password,
    };

    return await super.dispatchRequest<AuthSuccessResponseBody>(
      this.API_ROUTES.login,
      await super.buildRequestData<UserCredentialsRequestBody>(requestBody, null, 'POST'),
      'login'
    );
  }

  public async requestPasswordReset(email: string) {
    const requestBody: UserEmailRequestBody = {
      email,
    };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.requestPasswordReset,
      await super.buildRequestData<UserEmailRequestBody>(requestBody, null, 'POST'),
      'requestPasswordReset'
    );
  }

  public async resetPassword(userId: string, passwordResetToken: string, newPassword: string) {
    const requestBody: ResetPasswordRequestBody = {
      userId,
      passwordResetToken,
      newPassword,
    };

    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.resetPassword,
      await super.buildRequestData<ResetPasswordRequestBody>(requestBody, null, 'POST'),
      'resetPassword'
    );
  }

  public async logout() {
    return await super.dispatchRequest<Record<string, never>>(
      this.API_ROUTES.logout,
      await super.buildRequestData(null, null, 'POST', true),
      'logout'
    );
  }

  public async refresh(refreshToken: string) {
    const headers: HeadersInit = {
      Authorization: `Bearer ${refreshToken}`,
    };

    return await super.dispatchRequest<AuthSuccessResponseBody>(
      this.API_ROUTES.refresh,
      await super.buildRequestData(null, headers, 'POST'),
      'refresh'
    );
  }
}
