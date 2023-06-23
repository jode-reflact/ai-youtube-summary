import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { AuthService } from '@/services/auth-service';
import type { RequestFeedback } from '@/services/types/common';
import type { AuthSuccessResponseBody } from '@/services/types/auth';

export interface User {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface TokenContent {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthStore {
  user: Ref<User>;
  loggedIn: Ref<boolean>;
  logIn: (accessToken: string, refreshToken: string) => void;
  returnUrl: Ref<string>;
  restoreLogin: () => void;
  refreshIfNeeded: () => Promise<void>;
  authErrorMessagePath: Ref<string>;
  clearAuth: () => void;
}

const tokenExpired = (token: string) => {
  const tokenContent: TokenContent = jwtDecode<TokenContent>(token);
  return new Date(tokenContent.exp * 1000) < new Date();
};

// eslint-disable-next-line @typescript-eslint/typedef
export const useAuthStore = defineStore('auth', (): AuthStore => {
  const returnUrl: Ref<string> = ref('');

  const user: Ref<User> = ref({} as User);

  const loggedIn: Ref<boolean> = ref(false);

  const authErrorMessagePath: Ref<string> = ref('');

  const logIn = async (accessToken: string, refreshToken: string) => {
    const accessTokenContent: TokenContent = jwtDecode<TokenContent>(accessToken);

    const userData: User = {
      id: accessTokenContent.sub,
      email: accessTokenContent.email,
      accessToken,
      refreshToken,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    user.value = userData;
    loggedIn.value = true;
  };

  const restoreLogin = async () => {
    const lastUserJson: string | null = localStorage.getItem('user');
    if (!lastUserJson) return;
    const lastUser: User = JSON.parse(lastUserJson);
    if (tokenExpired(lastUser.refreshToken)) {
      authErrorMessagePath.value = 'auth.error.refreshTokenExpired';
      return;
    }
    await logIn(lastUser.accessToken, lastUser.refreshToken);
  };

  const clearAuth = () => {
    localStorage.removeItem('user');
    user.value = {} as User;
    loggedIn.value = false;
  };

  const authService: AuthService = new AuthService();

  const refreshTokens = async () => {
    if (tokenExpired(user.value.refreshToken)) {
      authErrorMessagePath.value = 'auth.error.refreshTokenExpired';
      return;
    }

    const refreshFeedback: RequestFeedback<AuthSuccessResponseBody> = await authService.refresh(
      user.value.refreshToken
    );

    if (refreshFeedback.isError || !refreshFeedback.data) {
      authErrorMessagePath.value = refreshFeedback.messagePath;
      return;
    }

    user.value.refreshToken = refreshFeedback.data.refreshToken;
    user.value.accessToken = refreshFeedback.data.accessToken;
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const refreshIfNeeded = async () => {
    if (tokenExpired(user.value.accessToken)) await refreshTokens();
  };

  return {
    user,
    loggedIn,
    logIn,
    returnUrl,
    restoreLogin,
    refreshIfNeeded,
    authErrorMessagePath,
    clearAuth,
  };
});
