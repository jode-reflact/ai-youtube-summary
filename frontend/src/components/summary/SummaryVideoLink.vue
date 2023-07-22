<template>
  <v-card target="_blank" :href="videoUrl" class="shadow-sm tw-flex tw-flex-col tw-rounded-3xl">
    <v-img :aspect-ratio="16 / 9" cover :src="video.metadata.thumbnailUrl">
      <v-icon
        icon="fas fa-play"
        class="tw-absolute tw-inset-0 tw-z-[5] tw-m-auto tw-h-auto tw-w-7 tw-shadow-black tw-drop-shadow-md"
      />
      <div
        class="bg-surface tw-absolute tw-bottom-6 tw-z-[5] tw-flex tw-items-center tw-rounded-3xl tw-px-3 tw-py-2 tw-shadow-md"
        :class="smAndDown ? 'tw-left-6' : 'tw-right-8'"
      >
        <v-icon icon="fas fa-clock" class="tw-mr-4 tw-h-auto tw-w-4" />
        <span>
          {{ parseSecondsToTime(video.metadata.durationInSeconds) }}
        </span>
      </div>
      <div class="bg-surface tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full tw-opacity-50" />
    </v-img>
  </v-card>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import type { Video } from '@/services/types/common';
import { computed, type ComputedRef } from 'vue';
import { getVideoUrlById } from '@/helpers/videos';
import { parseSecondsToTime } from '@/helpers/parse-seconds';

const { video } = defineProps<{
  video: Video;
}>();

const videoUrl: ComputedRef<string> = computed(() => getVideoUrlById(video.ytVideoId).toString());

const { smAndDown } = useDisplay();
</script>
