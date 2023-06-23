<template>
  <v-card class="shadow-md tw-mt-5 tw-max-w-lg tw-rounded-3xl">
    <v-img class="tw-h-28" :src="video.metadata.thumbnailUrl" cover />
    <div class="tw-p-5">
      <v-card-title class="tw-whitespace-break-spaces tw-p-0">
        {{ video.metadata.title }}
      </v-card-title>
      <v-card-subtitle class="tw-p-0"> {{ video.metadata.channelTitle }}</v-card-subtitle>
      <v-btn
        color="primary"
        variant="tonal"
        class="tw-mt-5 tw-w-full tw-rounded-3xl tw-p-3"
        @click="emit('addSummary')"
        :loading="loading"
      >
        <div class="tw-flex tw-items-center">
          <v-icon icon="fas fa-add" class="tw-mr-2 tw-aspect-square tw-h-auto tw-w-5" />
          <span class="tw-text-xl">{{ $t('general.add') }}</span>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import type { Video } from '@/services/types/common';

defineProps<{
  video: Video;
  loading: boolean;
}>();

const emit: (event: string, ...args: string[]) => void = defineEmits(['addSummary']);
</script>
