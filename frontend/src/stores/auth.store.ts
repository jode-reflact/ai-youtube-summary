import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarSrc: string;
}

interface AuthStore {
  user: Ref<User>;
  loggedIn: Ref<boolean>;
  logIn: (jwtToken: string) => void;
  logOut: () => void;
  returnUrl: Ref<string>;
}

interface GoogleInfo {
  iss: string;
  nbf: Date;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: true;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: Date;
  exp: Date;
  jti: string;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useAuthStore = defineStore('auth', (): AuthStore => {
  const returnUrl: Ref<string> = ref('');

  const localStorageUserJson: string | null = localStorage.getItem('user');
  const user: Ref<User> = ref(
    localStorageUserJson
      ? JSON.parse(localStorageUserJson)
      : { username: '', email: '', fullName: '' }
  );

  const loggedIn: Ref<boolean> = ref(!!localStorageUserJson);

  const logIn = (jwtToken: string) => {
    const encodedResponse: GoogleInfo = jwtDecode(jwtToken);
    user.value.username = encodedResponse.name;
    user.value.email = encodedResponse.email;
    user.value.firstName = encodedResponse.given_name;
    user.value.lastName = encodedResponse.family_name;
    user.value.avatarSrc = encodedResponse.picture;
    localStorage.setItem('user', JSON.stringify(user.value));
    loggedIn.value = true;
  };

  const logOut = () => {
    user.value.username = '';
    user.value.email = '';
    user.value.firstName = '';
    user.value.lastName = '';
    user.value.avatarSrc = '';
    localStorage.removeItem('user');
    loggedIn.value = false;
  };

  return { user, loggedIn, logIn, logOut, returnUrl };
});
