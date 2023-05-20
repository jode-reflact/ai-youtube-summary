<template>
  <v-card :href="summary.url" class="shadow-sm tw-flex tw-flex-col tw-rounded-3xl">
    <v-img :aspect-ratio="16 / 9" cover :src="summary.thumbnailSrc">
      <font-awesome-icon
        class="tw-absolute tw-inset-0 tw-z-[5] tw-m-auto tw-h-auto tw-w-7 tw-shadow-black tw-drop-shadow-md"
        :icon="faPlay"
      />
      <div
        class="bg-surface tw-absolute tw-bottom-6 tw-z-[5] tw-flex tw-items-center tw-rounded-3xl tw-px-3 tw-py-2 tw-shadow-md"
        :class="smAndDown ? 'tw-left-6' : 'tw-right-8'"
      >
        <font-awesome-icon :icon="faClock" class="tw-mr-2 tw-h-auto tw-w-4" />
        <span>
          {{ parseMilliseconds(summary.durationMilliseconds, '') }}
        </span>
      </div>
      <div class="bg-surface tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full tw-opacity-50" />
    </v-img>
  </v-card>
</template>
<script setup lang="ts">
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { parseMilliseconds } from '@/helpers/parse-milliseconds';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { SummaryItem } from '../../../dummy/summaries';
import { useDisplay } from 'vuetify';

defineProps<{
  summary: SummaryItem;
}>();

const { smAndDown } = useDisplay();
</script>
