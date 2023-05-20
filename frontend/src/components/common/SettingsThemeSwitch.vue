<template>
  <v-switch
    color="yellow"
    true-value="darkTheme"
    false-value="lightTheme"
    v-model="currentTheme"
    hide-details
    inset
    @update:model-value="setTheme(currentTheme)"
  >
    <template #label>
      <div class="tw-flex tw-items-center">
        <font-awesome-icon class="tw-aspect-square tw-h-auto tw-w-5" :icon="themeIcon" />
        <span class="tw-ml-2 tw-text-lg">{{ label }}</span>
      </div>
    </template>
  </v-switch>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSetTheme } from '@/composables/set-theme';
import { type ThemeInstance, useTheme } from 'vuetify';
import type { ComputedRef, Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const theme: ThemeInstance = useTheme();
const { setTheme } = useSetTheme();

const { t } = useI18n();

const currentTheme: Ref<string> = ref(theme.global.name.value);
const label: ComputedRef<string> = computed(() => t(`settings.theme.${currentTheme.value}`));
const themeIcon: ComputedRef<IconDefinition> = computed(() =>
  currentTheme.value === 'darkTheme' ? faMoon : faSun
);

watch(
  () => theme.global.name.value,
  (newTheme: string) => (currentTheme.value = newTheme)
);
</script>
