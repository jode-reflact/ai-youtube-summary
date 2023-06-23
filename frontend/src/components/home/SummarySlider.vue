<template>
  <div class="tw-flex tw-w-full tw-overflow-x-auto">
    <summary-card
      v-for="(videoItem, index) in videoItems"
      :key="index"
      :video="videoItem"
      class="tw-mr-4 tw-flex-shrink-0 last-of-type:tw-mr-0"
      :pending="!!pending"
    />
  </div>
</template>
<script setup lang="ts">
import SummaryCard from '@/components/home/SummaryCard.vue';
import type { Video } from '@/services/types/common';

defineProps<{
  videoItems: Video[];
  pending?: boolean;
}>();
</script>
