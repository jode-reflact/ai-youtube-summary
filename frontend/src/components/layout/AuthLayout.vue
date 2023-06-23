<template>
  <div class="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-p-10">
    <div
      class="tw-flex tw-items-center tw-justify-center"
      :class="smAndDown ? 'tw-mb-14' : 'tw-mb-20'"
    >
      <img
        class="tw-h-auto"
        :class="smAndDown ? 'tw-w-14' : 'tw-w-20'"
        src="/logoipsum-296.svg"
        alt="Logo"
      />
      <span
        class="tw-align-middle tw-font-bold tw-opacity-100"
        :class="smAndDown ? 'tw-ml-5 tw-text-5xl' : 'tw-ml-8 tw-text-6xl'"
      >
        {{ appTitle }}
      </span>
    </div>
    <v-card
      v-if="!smAndDown"
      class="shadow-lg tw-flex tw-max-h-[70vh] tw-w-full tw-max-w-lg tw-flex-col tw-overflow-y-auto tw-rounded-3xl tw-p-10"
    >
      <span class="tw-mx-auto tw-mb-10 tw-text-4xl tw-font-bold">
        {{ $t(`auth.${String(route.name)}.title`) }}
      </span>
      <router-view />
    </v-card>
    <div class="tw-flex tw-w-full tw-max-w-md tw-flex-col" v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const appTitle: string = import.meta.env.VITE_APP_TITLE;

const route: RouteLocationNormalizedLoaded = useRoute();

const { smAndDown } = useDisplay();
</script>
