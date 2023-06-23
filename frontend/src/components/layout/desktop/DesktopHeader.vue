<template>
  <div class="tw-flex tw-flex-wrap tw-justify-between tw-py-7">
    <router-link to="/" class="tw-mr-4 tw-flex tw-items-center">
      <v-img :aspect-ratio="1" src="/logoipsum-296.svg" class="tw-mr-5 tw-h-auto tw-w-14" />
      <span class="tw-text-5xl tw-font-bold">
        {{ appTitle }}
      </span>
    </router-link>
    <div class="tw-flex tw-items-center">
      <search-field class="desktop-search tw-h-full tw-w-72" />
      <div class="tw-w-4" />
      <locale-button />
      <div class="tw-w-4" />
      <theme-button />
      <div class="tw-w-4" />
      <logout-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import LocaleButton from '@/components/global-settings/LocaleButton.vue';
import ThemeButton from '@/components/global-settings/ThemeButton.vue';
import LogoutButton from '@/components/global-settings/LogoutButton.vue';
import SearchField from '@/components/common/SearchField.vue';

const appTitle: string = import.meta.env.VITE_APP_TITLE;
</script>
