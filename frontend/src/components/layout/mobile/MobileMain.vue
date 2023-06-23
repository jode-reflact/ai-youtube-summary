<template>
  <mobile-header />
  <global-settings @open-search="searchOpened = true" />
  <v-container class="tw-mt-28 tw-h-fit tw-p-8 tw-pb-0">
    <router-view />
  </v-container>
  <mobile-search-overlay v-if="searchOpened" @close-search="searchOpened = false" />
</template>

<script setup lang="ts">
import MobileHeader from '@/components/layout/mobile/MobileHeader.vue';
import GlobalSettings from '@/components/layout/mobile/GlobalSettings.vue';
import MobileSearchOverlay from '@/components/layout/mobile/MobileSearchOverlay.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';

const searchOpened: Ref<boolean> = ref(false);
</script>
