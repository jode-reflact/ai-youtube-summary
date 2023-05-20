<template>
  <content-section divider>
    <template #title>{{ t('settings.theme.title') }}</template>
    <settings-theme-switch />
  </content-section>
  <content-section>
    <template #title>{{ t('settings.language.title') }}</template>
    <settings-language-options />
  </content-section>
</template>
<script setup lang="ts">
import ContentSection from '@/components/layout/ContentSection.vue';
import SettingsThemeSwitch from '@/components/common/SettingsThemeSwitch.vue';
import { useI18n } from 'vue-i18n';
import SettingsLanguageOptions from '@/components/common/SettingsLanguageOptions.vue';

const { t } = useI18n();
</script>
