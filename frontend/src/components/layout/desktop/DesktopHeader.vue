<template>
  <div class="tw-flex tw-justify-between tw-py-7">
    <router-link to="/" class="tw-mr-4 tw-flex tw-min-w-0 tw-items-center">
      <v-img :aspect-ratio="1" src="/Logo.png" class="tw-mr-5 tw-h-auto tw-max-w-[5rem]" />
      <span class="tw-text-5xl tw-font-bold">
        {{ appTitle }}
      </span>
    </router-link>
    <div class="tw-flex tw-min-w-max tw-items-center">
      <search-field class="desktop-search tw-w-72 tw-min-w-[18rem]" />
      <div class="tw-min-w-[1rem]" />
      <locale-button />
      <div class="tw-min-w-[1rem]" />
      <theme-button />
      <div class="tw-min-w-[1rem]" />
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
