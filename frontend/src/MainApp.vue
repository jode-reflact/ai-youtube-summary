<template>
  <v-app class="tw-transition-colors tw-duration-200">
    <router-view />
    <auth-error-dialog />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { onBeforeMount } from 'vue';
import { useSetTheme } from '@/composables/set-theme';
import AuthErrorDialog from '@/components/auth/AuthErrorDialog.vue';
import { useSetLocale } from '@/composables/set-locale';

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();

const { setTheme } = useSetTheme();

const { setLocale } = useSetLocale();

const getNavigatorLang = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || 'en';

onBeforeMount(async () => {
  await authStore.restoreLogin();
  setTheme(
    localStorage.getItem('user-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'darkTheme' : 'lightTheme')
  );
  setLocale(localStorage.getItem('user-lang') || getNavigatorLang());
});
</script>
