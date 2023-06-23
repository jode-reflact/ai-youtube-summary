<template>
  <content-section title-icon="fas fa-clock">
    <template #title>{{ $t('home.pendingSummaries.title') }}</template>
    <v-alert
      v-if="feedback.isError"
      variant="tonal"
      type="error"
      width="max-content"
      class="tw-mb-5 tw-rounded-3xl"
      :title="$t('home.pendingSummaries.errorTitle')"
    >
      <p>{{ $t(feedback.messagePath) }}</p>
    </v-alert>
    <summary-slider v-else-if="pendingVideos.length > 0" pending :video-items="pendingVideos" />
    <p v-else class="tw-text-lg">{{ $t('home.pendingSummaries.empty') }}</p>
  </content-section>
</template>
<script setup lang="ts">
import SummarySlider from '@/components/home/SummarySlider.vue';
import ContentSection from '@/components/layout/ContentSection.vue';
import type { RequestFeedback, Video } from '@/services/types/common';
import { computed, type ComputedRef } from 'vue';
import { filterPendingVideos } from '@/helpers/videos';

const { feedback } = defineProps<{
  feedback: RequestFeedback<Video[]>;
}>();

const pendingVideos: ComputedRef<Video[]> = computed(() => {
  if (!feedback.data || !feedback.data.length) return [];
  return filterPendingVideos(feedback.data);
});
</script>
