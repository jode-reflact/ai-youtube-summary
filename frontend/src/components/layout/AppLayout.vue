<template>
  <v-main>
    <desktop-main v-if="mdAndUp" />
    <mobile-main v-else />
  </v-main>
</template>
<script setup lang="ts">
import MobileMain from '@/components/layout/mobile/MobileMain.vue';
import DesktopMain from '@/components/layout/desktop/DesktopMain.vue';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();
</script>
