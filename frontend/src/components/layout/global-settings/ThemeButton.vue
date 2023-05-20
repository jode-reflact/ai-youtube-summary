<template>
  <v-btn
    @click="toggleTheme()"
    variant="flat"
    color="nav-surface"
    class="shadow-sm tw-rounded-3xl tw-p-5"
  >
    <font-awesome-icon :icon="icon" class="tw-aspect-square tw-h-auto tw-w-6" />
  </v-btn>
</template>

<script setup lang="ts">
import { type ThemeInstance, useTheme } from 'vuetify';
import { computed, type ComputedRef } from 'vue';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSetTheme } from '@/composables/set-theme';

const theme: ThemeInstance = useTheme();

const { setTheme } = useSetTheme();

const toggleTheme = () => {
  setTheme(theme.global.current.value.dark ? 'lightTheme' : 'darkTheme');
};

const icon: ComputedRef<IconDefinition> = computed(() =>
  theme.global.current.value.dark ? faSun : faMoon
);
</script>
