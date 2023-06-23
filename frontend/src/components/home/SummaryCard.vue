<template>
  <div class="tw-px-3 tw-pb-5 tw-pt-0">
    <v-card
      :to="pending ? '' : `/summary/${video.ytVideoId}`"
      class="shadow-sm tw-flex tw-h-auto tw-w-72 tw-flex-col tw-rounded-3xl"
    >
      <v-img :class="{ 'tw-h-36': !mdAndUp }" :cover="!mdAndUp" :src="video.metadata.thumbnailUrl">
        <div
          v-if="pending"
          class="tw-absolute tw-z-10 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-60"
        />
        <channel-badge
          :channel-title="video.metadata.channelTitle"
          :channel-avatar-url="video.metadata.channelAvatarUrl"
          class="tw-bottom-3 tw-right-3"
        />
      </v-img>
      <div class="tw-shrink-0 tw-grow tw-px-2 tw-py-5">
        <v-card-title class="tw-truncate tw-py-0">{{ video.metadata.title }}</v-card-title>
        <v-card-text v-if="!pending">
          <span class="tw-line-clamp-3">
            {{ video.ytVideoId }}
          </span>
        </v-card-text>
        <v-card-subtitle class="tw-mb-1 tw-text-xs">
          {{ $t('general.uploadedOn') }} {{ $d(new Date(video.metadata.publishedAt)) }}
        </v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import ChannelBadge from '@/components/common/ChannelBadge.vue';
import type { Video } from '@/services/types/common';

const { mdAndUp } = useDisplay();

defineProps<{
  video: Video;
  pending?: boolean;
}>();
</script>
