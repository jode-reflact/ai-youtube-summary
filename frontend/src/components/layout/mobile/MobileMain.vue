<template>
  <mobile-nav />
  <global-settings />
  <v-container class="tw-mt-32 tw-h-fit tw-p-8">
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import MobileNav from '@/components/layout/mobile/MobileNav.vue';
import GlobalSettings from '@/components/layout/mobile/GlobalSettings.vue';
</script>
