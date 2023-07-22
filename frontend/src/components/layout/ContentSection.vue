<template>
  <div class="tw-flex tw-flex-col tw-pb-8">
    <div class="tw-flex tw-items-center">
      <v-icon
        v-if="titleIcon"
        :icon="titleIcon"
        class="tw-mr-5 tw-aspect-square tw-h-auto tw-w-6"
      />
      <span
        :lang="locale as string"
        class="tw-min-w-0 tw-hyphens-auto tw-break-words tw-pb-1 tw-text-3xl tw-font-semibold"
      >
        <slot name="title" />
      </span>
    </div>
    <div class="tw-mt-8 tw-flex tw-flex-col">
      <slot />
    </div>
    <v-divider v-if="divider" class="tw-my-5" />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  titleIcon?: string;
  divider?: boolean;
}>();

const { locale } = useI18n({ useScope: 'global' });
</script>
