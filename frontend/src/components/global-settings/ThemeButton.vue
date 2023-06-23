<template>
  <v-btn
    @click="toggleTheme()"
    variant="flat"
    color="nav-surface"
    class="shadow-sm tw-rounded-3xl tw-p-5"
    :icon="theme.global.current.value.dark ? 'fas fa-sun' : 'fas fa-moon'"
  />
</template>

<script setup lang="ts">
import { type ThemeInstance, useTheme } from 'vuetify';
import { useSetTheme } from '@/composables/set-theme';

const theme: ThemeInstance = useTheme();

const { setTheme } = useSetTheme();

const toggleTheme = () => {
  setTheme(theme.global.current.value.dark ? 'lightTheme' : 'darkTheme');
};
</script>
