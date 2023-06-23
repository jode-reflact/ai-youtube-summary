<template>
  <div class="tw-fixed tw-bottom-0 tw-right-0 tw-z-10 tw-flex tw-flex-col tw-p-5">
    <mobile-search-button @open-search="emit('openSearch')" />
    <div class="tw-h-3" />
    <locale-button />
    <div class="tw-h-3" />
    <theme-button />
  </div>
</template>
<script setup lang="ts">
import LocaleButton from '@/components/global-settings/LocaleButton.vue';
import ThemeButton from '@/components/global-settings/ThemeButton.vue';
import MobileSearchButton from '@/components/layout/mobile/MobileSearchButton.vue';

const emit: (event: 'openSearch') => void = defineEmits<{
  (event: 'openSearch'): void;
}>();
</script>
