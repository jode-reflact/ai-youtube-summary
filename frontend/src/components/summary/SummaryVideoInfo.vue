<template>
  <v-card class="shadow-md tw-flex tw-flex-col tw-rounded-3xl tw-p-5">
    <v-btn flat :href="channelUrl" class="tw-flex tw-rounded-3xl tw-px-4 tw-py-3" color="surface">
      <div class="tw-flex tw-w-full tw-items-center">
        <v-img
          class="tw-mr-3 tw-aspect-square tw-h-auto tw-w-10 tw-rounded-full"
          :src="video.metadata.channelAvatarUrl"
        >
          <template #placeholder>
            <v-progress-circular indeterminate />
          </template>
        </v-img>
        <span class="tw-truncate tw-text-lg">{{ video.metadata.channelTitle }}</span>
      </div>
    </v-btn>
    <v-list>
      <v-list-item prepend-icon="fas fa-clock" class="tw-mb-2">
        <template #title>{{ $t('general.duration') }}</template>
        <template #subtitle>{{ parseSecondsToTime(video.metadata.durationInSeconds) }}</template>
      </v-list-item>
      <v-list-item prepend-icon="fas fa-cloud-arrow-up" class="tw-mb-2">
        <template #title>{{ $t('general.uploadedOn') }}</template>
        <template #subtitle>{{ $d(new Date(video.metadata.publishedAt)) }}</template>
      </v-list-item>
      <v-list-item prepend-icon="fas fa-table-list">
        <template #title>{{ $t('general.addedOn') }}</template>
        <template #subtitle>{{ $d(new Date(video.metadata.lastUpdated)) }}</template>
      </v-list-item>
      <v-list-item prepend-icon="fas fa-eye">
        <template #title>{{ $t('general.viewCount') }}</template>
        <template #subtitle>{{ video.metadata.statistics.viewCount }}</template>
      </v-list-item>
      <v-list-item prepend-icon="fas fa-thumbs-up">
        <template #title>{{ $t('general.likeCount') }}</template>
        <template #subtitle>{{ video.metadata.statistics.likeCount }}</template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import type { Video } from '@/services/types/common';
import { computed, type ComputedRef } from 'vue';
import { getChannelUrlById } from '@/helpers/videos';
import { parseSecondsToTime } from '@/helpers/parse-seconds';

const { video } = defineProps<{
  video: Video;
}>();

const channelUrl: ComputedRef<string> = computed(() =>
  getChannelUrlById(video.metadata.channelId).toString()
);
</script>
