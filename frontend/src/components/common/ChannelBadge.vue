<template>
  <div
    class="bg-surface tw-absolute tw-flex tw-max-w-[12rem] tw-items-center tw-rounded-full tw-px-3 tw-py-2 tw-shadow-sm"
  >
    <v-img class="tw-aspect-square tw-w-8 tw-rounded-full" :src="channelAvatarUrl" alt="Avatar">
      <template #placeholder>
        <v-progress-circular indeterminate />
      </template>
    </v-img>
    <span class="tw-mx-2 tw-truncate tw-text-sm">{{ channelTitle }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  channelTitle: string;
  channelAvatarUrl: string;
}>();
</script>
