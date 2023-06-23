<template>
  <v-container
    fluid
    class="tw-flex tw-h-full tw-max-w-[120rem] tw-flex-col tw-px-12 tw-pb-0 tw-pt-5"
  >
    <desktop-header />
    <v-divider />
    <div class="-tw-mx-12 tw-grow tw-overflow-y-auto tw-px-12 tw-pt-7">
      <router-view />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import DesktopHeader from '@/components/layout/desktop/DesktopHeader.vue';
import { RouterView } from 'vue-router';
</script>
