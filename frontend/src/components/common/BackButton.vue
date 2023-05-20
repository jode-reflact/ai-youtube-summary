<template>
  <v-btn flat color="surface" class="shadow-sm tw-mb-8 tw-rounded-3xl tw-px-7 tw-py-3">
    <template #prepend><font-awesome-icon :icon="faArrowLeft" /></template>
    <span class="tw-ml-2 tw-text-lg">{{ t('general.backTo') }} {{ targetPageName }}</span>
  </v-btn>
</template>
<script setup lang="ts">
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  targetPageName: string;
}>();
</script>
