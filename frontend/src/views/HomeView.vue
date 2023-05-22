<template>
  <content-section>
    <template #title>{{ $t('home.recentSummaries') }}</template>
    <summary-slider :summary-items="summaryItems" />
  </content-section>
</template>

<script setup lang="ts">
import { summaryItems } from '../../dummy/summaries';
import ContentSection from '@/components/layout/ContentSection.vue';
import SummarySlider from '@/components/common/SummarySlider.vue';
</script>
