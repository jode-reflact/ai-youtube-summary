<template>
  <div
    class="bg-nav-surface shadow-md tw-absolute tw-top-20 tw-z-10 tw-flex tw-flex-col tw-rounded-3xl tw-p-5 tw-pr-0"
    :class="mdAndUp ? '-tw-left-20 tw-max-h-[50vh] tw-w-96' : 'tw-max-h-80 tw-w-full'"
    v-if="suggestions.length"
  >
    <div class="search-suggestions tw-w-full tw-overflow-y-auto">
      <v-btn
        variant="text"
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="tw-flex tw-w-full tw-justify-start tw-rounded-2xl tw-p-5"
        @click="clickHandler(suggestion.id)"
      >
        <div class="tw-flex tw-items-center">
          <v-img
            :aspect-ratio="1"
            cover
            :src="suggestion.thumbnailSrc"
            class="tw-mr-4 tw-w-10 tw-rounded-xl"
          />
          <span class="tw-truncate tw-text-lg">{{ suggestion.title }}</span>
        </div>
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SummaryItem } from '../../../dummy/summaries';
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

defineProps<{
  suggestions: SummaryItem[];
}>();

const router: Router = useRouter();

const clickHandler = (summaryId: string) => {
  router.push(`/summary/${summaryId}`);
};

const { mdAndUp } = useDisplay();
</script>
