<template>
  <div class="tw-px-3 tw-pb-5 tw-pt-0">
    <v-card
      :to="`/summary/${summary.id}`"
      class="shadow-sm tw-flex tw-h-auto tw-w-72 tw-flex-col tw-rounded-3xl"
    >
      <v-img :class="{ 'tw-h-36': !mdAndUp }" :cover="!mdAndUp" :src="summary.thumbnailSrc">
        <channel-badge
          v-if="summaryChannel"
          :summary-channel="summaryChannel"
          class="tw-bottom-3 tw-right-3"
        />
      </v-img>
      <div class="tw-shrink-0 tw-grow tw-px-2 tw-py-5">
        <v-card-title class="tw-truncate tw-py-0">{{ summary.title }}</v-card-title>
        <v-card-subtitle>{{ summary.playlist }}</v-card-subtitle>
        <v-card-text>
          <span class="tw-line-clamp-3">
            {{ summary.summary }}
          </span>
        </v-card-text>
        <v-card-subtitle class="tw-mb-1 tw-text-xs">
          {{ $t('general.addedOn') }} {{ summary.addedDate.toLocaleDateString() }}
        </v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import type { SummaryItem } from '../../../dummy/summaries';
import { useDisplay } from 'vuetify';
import type { ChannelItem } from '../../../dummy/channels';
import ChannelBadge from '@/components/common/ChannelBadge.vue';
import { fetchChannel } from '@/services/fetch-channel';

const { mdAndUp } = useDisplay();

const { summary } = defineProps<{
  summary: SummaryItem;
}>();

const summaryChannel: ChannelItem | undefined = fetchChannel(summary.channelId);
</script>
