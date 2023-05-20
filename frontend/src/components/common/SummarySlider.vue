<template>
  <div class="tw-flex tw-w-full tw-overflow-x-auto">
    <summary-card
      v-for="(summary, index) in summaryItems"
      :key="index"
      :summary="summary"
      class="tw-flex-shrink-0"
      :class="{ 'tw-mr-4': index !== summaryItems.length - 1 }"
    />
  </div>
</template>
<script setup lang="ts">
import type { SummaryItem } from '../../../dummy/summaries';
import SummaryCard from '@/components/common/SummaryCard.vue';

defineProps<{
  summaryItems: SummaryItem[];
}>();
</script>
