<template>
  <div class="tw-flex tw-flex-col">
    <span class="tw-text-3xl tw-font-semibold">
      <slot name="title" />
    </span>
    <div class="tw-mt-8 tw-flex tw-flex-col">
      <slot />
    </div>
  </div>
  <v-divider v-if="divider" class="tw-my-5" />
</template>
<script setup lang="ts">
defineProps<{
  divider?: boolean;
}>();
</script>
