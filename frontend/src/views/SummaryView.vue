<template>
  <content-section>
    <template #title>{{ summary.title }}</template>
    <div class="tw-flex" :class="{ 'tw-flex-col': mdAndDown }">
      <p class="tw-grow tw-basis-1/2 tw-text-justify tw-text-lg">
        {{ summary.summary }}
      </p>
      <div
        class="tw-flex tw-basis-1/2 tw-flex-col"
        :class="{ 'tw-mt-10': mdAndDown, 'tw-pl-10': lgAndUp }"
      >
        <summary-video-info :summary="summary" />
        <summary-video-card class="tw-mt-10" :summary="summary" />
      </div>
    </div>
  </content-section>
</template>
<script setup lang="ts">
import ContentSection from '@/components/layout/ContentSection.vue';
import type { SummaryItem } from '../../dummy/summaries';
import { onBeforeMount, type Ref, ref, watch } from 'vue';
import { type Router, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import SummaryVideoCard from '@/components/common/SummaryVideoCard.vue';
import SummaryVideoInfo from '@/components/common/SummaryVideoInfo.vue';
import { fetchSummary } from '@/services/fetch-summary';

const { summaryId } = defineProps<{
  summaryId: string;
}>();

const { mdAndDown, lgAndUp } = useDisplay();

const summary: Ref<SummaryItem> = ref({} as SummaryItem);

const router: Router = useRouter();

const setSummary = () => {
  const summaryResponse: SummaryItem | undefined = fetchSummary(summaryId);
  if (!summaryResponse) {
    router.push('/');
  } else {
    summary.value = summaryResponse;
  }
};

onBeforeMount(() => {
  setSummary();
});

watch(
  () => summaryId,
  () => {
    setSummary();
  }
);
</script>
