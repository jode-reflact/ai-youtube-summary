<template>
  <div class="tw-flex tw-h-full tw-w-full">
    <desktop-nav />
    <v-main class="tw-h-screen tw-min-w-0 tw-flex-shrink">
      <v-container fluid class="tw-flex tw-h-full tw-flex-col tw-px-12 tw-pb-0 tw-pt-5">
        <desktop-header />
        <v-divider class="tw-mb-7" />
        <div class="-tw-mx-12 tw-grow tw-overflow-y-auto tw-px-12 tw-pb-12">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <user-card v-if="xlAndUp" />
  </div>
</template>

<script setup lang="ts">
import DesktopNav from '@/components/layout/desktop/DesktopNav.vue';
import DesktopHeader from '@/components/layout/desktop/DesktopHeader.vue';
import { RouterView } from 'vue-router';
import UserCard from '@/components/layout/desktop/UserCard.vue';
import { useDisplay } from 'vuetify';

const { xlAndUp } = useDisplay();
</script>
