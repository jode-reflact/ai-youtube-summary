<template>
  <v-btn
    @click="emit('openSearch')"
    variant="flat"
    color="nav-surface"
    class="shadow-sm tw-rounded-3xl tw-p-5"
    icon="fas fa-search"
  />
</template>
<script setup lang="ts">
const emit: (event: 'openSearch') => void = defineEmits<{
  (event: 'openSearch'): void;
}>();
</script>
