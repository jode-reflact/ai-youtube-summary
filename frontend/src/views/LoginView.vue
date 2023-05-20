<template>
  <div class="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
    <v-card
      class="shadow-lg tw-flex tw-h-min tw-w-min tw-flex-col tw-rounded-3xl"
      :class="mdAndUp ? 'tw-p-20' : 'tw-p-10'"
    >
      <div class="tw-mb-10 tw-flex tw-items-center tw-justify-around">
        <img class="tw-h-auto tw-w-16" src="/logoipsum-296.svg" alt="Logo" />
        <span class="tw-ml-4 tw-align-middle tw-text-5xl tw-font-bold tw-opacity-100">{{
          appTitle
        }}</span>
      </div>
      <div class="tw-overflow-hidden tw-rounded-3xl" id="loginButton" />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useDisplay } from 'vuetify';

const appTitle: string = import.meta.env.VITE_APP_TITLE;

const { mdAndUp } = useDisplay();

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();

// eslint-disable-next-line @typescript-eslint/typedef
const handleGoogleResponse = (response: { credential: string; select_by: string }) => {
  authStore.logIn(response.credential);
  router.push(authStore.returnUrl || '/');
};

onMounted(() => {
  /** global google */
  google.accounts.id.initialize({
    // eslint-disable-next-line camelcase
    client_id: '186931154050-95n8ka6akq8gmivu744rhdjff6ijum1f.apps.googleusercontent.com',
    callback: handleGoogleResponse,
  });
  google.accounts.id.renderButton(document.getElementById('loginButton'), {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    width: 270,
  });
});
</script>
