<template>
  <div class="tw-w-full tw-overflow-y-auto">
    <v-card
      v-for="(videoSuggestion, index) in videoSuggestions"
      :key="index"
      :image="videoSuggestion.metadata.thumbnailUrl"
      class="tw-mb-5 tw-w-full tw-rounded-2xl last-of-type:tw-mb-0"
      @click="emit('suggestionClicked', videoSuggestion.ytVideoId)"
    >
      <div class="bg-surface tw-absolute tw-h-full tw-w-full tw-opacity-50" />
      <div class="tw-flex tw-items-center tw-justify-start tw-p-5 tw-backdrop-blur">
        <v-img
          :aspect-ratio="1"
          :src="videoSuggestion.metadata.channelAvatarUrl"
          class="tw-h-auto tw-w-10 tw-grow-0 tw-rounded-xl"
        />
        <span class="tw-ml-4 tw-truncate tw-text-lg">{{ videoSuggestion.metadata.title }}</span>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import type { Video } from '@/services/types/common';

defineProps<{
  videoSuggestions: Video[];
}>();

const emit: (event: 'suggestionClicked', ytVideoId: string) => void = defineEmits<{
  (event: 'suggestionClicked', ytVideoId: string): void;
}>();
</script>
