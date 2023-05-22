<template>
  <v-card class="shadow-md tw-flex tw-flex-col tw-rounded-3xl tw-p-5">
    <v-btn
      v-if="summaryChannel"
      flat
      :href="summaryChannel.url"
      class="channel-button tw-flex tw-rounded-3xl tw-px-4 tw-py-3"
      color="surface"
    >
      <div class="tw-flex tw-w-full tw-items-center">
        <v-img
          class="tw-aspect-square tw-h-auto tw-w-10 tw-rounded-full"
          :src="summaryChannel.avatarUrl"
        >
          <template #placeholder>
            <v-progress-circular indeterminate />
          </template>
        </v-img>
        <span class="tw-ml-3 tw-truncate tw-text-lg">{{ summaryChannel.name }}</span>
      </div>
    </v-btn>
    <v-list>
      <v-list-item class="tw-mb-2">
        <template #prepend>
          <font-awesome-icon :icon="faClock" class="tw-mr-4 tw-h-auto tw-w-5" />
        </template>
        <template #title>{{ $t('general.duration') }}</template>
        <template #subtitle>{{ parseMilliseconds(summary.durationMilliseconds, '') }}</template>
      </v-list-item>
      <v-list-item class="tw-mb-2">
        <template #prepend>
          <font-awesome-icon :icon="faCloudArrowUp" class="tw-mr-4 tw-h-auto tw-w-5" />
        </template>
        <template #title>{{ $t('general.uploadedOn') }}</template>
        <template #subtitle>{{ summary.uploadedDate.toLocaleDateString() }}</template>
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <font-awesome-icon :icon="faTableList" class="tw-mr-4 tw-h-auto tw-w-5" />
        </template>
        <template #title>{{ $t('general.addedOn') }}</template>
        <template #subtitle>{{ summary.addedDate.toLocaleDateString() }}</template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import type { ChannelItem } from '../../../dummy/channels';
import type { SummaryItem } from '../../../dummy/summaries';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClock, faCloudArrowUp, faTableList } from '@fortawesome/free-solid-svg-icons';
import { parseMilliseconds } from '@/helpers/parse-milliseconds';
import { fetchChannel } from '@/services/fetch-channel';

const { summary } = defineProps<{
  summary: SummaryItem;
}>();

const summaryChannel: ChannelItem | undefined = fetchChannel(summary.channelId);
</script>
