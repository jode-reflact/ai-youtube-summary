<template>
  <v-app class="tw-transition-colors tw-duration-200">
    <div v-if="loggedIn" class="tw-grow">
      <desktop-main v-if="mdAndUp" />
      <mobile-main v-else />
    </div>
    <router-view v-else />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import DesktopMain from '@/components/layout/desktop/DesktopMain.vue';
import MobileMain from '@/components/layout/mobile/MobileMain.vue';
import { onMounted } from 'vue';
import { useSetTheme } from '@/composables/set-theme';

const { mdAndUp } = useDisplay();
// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore);

const { setTheme } = useSetTheme();

onMounted(() => {
  setTheme(
    localStorage.getItem('user-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'darkTheme' : 'lightTheme')
  );
});
</script>
