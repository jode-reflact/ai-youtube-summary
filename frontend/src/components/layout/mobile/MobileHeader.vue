<template>
  <div class="tw-fixed tw-z-50 tw-h-28 tw-w-full tw-rounded-3xl tw-p-5 tw-pb-0 tw-backdrop-blur">
    <v-card
      color="nav-surface"
      class="shadow-md tw-flex tw-h-full tw-items-center tw-rounded-3xl tw-px-6 tw-py-4"
    >
      <router-link to="/" class="tw-mr-auto tw-flex tw-items-center">
        <v-img
          :aspect-ratio="1"
          src="/logoipsum-296.svg"
          alt="Logo"
          class="tw-mr-5 tw-h-auto tw-w-12"
        />
        <span class="tw-text-3xl tw-font-bold">{{ appTitle }}</span>
      </router-link>
      <logout-button />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import LogoutButton from '@/components/global-settings/LogoutButton.vue';

const appTitle: string = import.meta.env.VITE_APP_TITLE;
</script>
