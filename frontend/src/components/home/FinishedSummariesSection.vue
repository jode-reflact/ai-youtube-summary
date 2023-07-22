<template>
  <content-section title-icon="fas fa-list-dots">
    <template #title>{{ $t('home.finishedSummaries.title') }}</template>
    <v-alert
      v-if="feedback.isError"
      variant="tonal"
      type="error"
      width="max-content"
      class="tw-mb-5 tw-rounded-3xl"
      :title="$t('home.finishedSummaries.errorTitle')"
    >
      <p>{{ $t(feedback.messagePath) }}</p>
    </v-alert>
    <summary-slider v-else-if="finishedVideos.length > 0" :video-items="finishedVideos" />
    <p v-else class="tw-text-lg">{{ $t('home.finishedSummaries.empty') }}</p>
  </content-section>
</template>
<script setup lang="ts">
import SummarySlider from '@/components/home/SummarySlider.vue';
import ContentSection from '@/components/layout/ContentSection.vue';
import type { RequestFeedback, Video } from '@/services/types/common';
import { computed, type ComputedRef } from 'vue';
import { filterFinishedVideos, sortVideosByLastUpdated } from '@/helpers/videos';

const { feedback } = defineProps<{
  feedback: RequestFeedback<Video[]>;
}>();

const finishedVideos: ComputedRef<Video[]> = computed(() => {
  if (!feedback.data || !feedback.data.length) return [];
  const finishedVideos: Video[] = filterFinishedVideos(feedback.data);
  return sortVideosByLastUpdated(finishedVideos);
});
</script>
