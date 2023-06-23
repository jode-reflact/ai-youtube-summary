<template>
  <content-section title-icon="fas fa-bomb">
    <template #title>
      {{ $t('general.notFoundTitle') }}
    </template>
    <span>
      {{ $t('general.notFoundMessage') }}
    </span>
  </content-section>
</template>
<script setup lang="ts">
import ContentSection from '@/components/layout/ContentSection.vue';
</script>
