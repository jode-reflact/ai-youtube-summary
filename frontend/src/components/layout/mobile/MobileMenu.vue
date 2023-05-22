<template>
  <v-card
    class="tw-mt-4 tw-flex tw-flex-col tw-rounded-3xl tw-p-5 tw-shadow-none tw-drop-shadow-xl"
    color="nav-surface"
  >
    <div class="tw-mx-auto tw-mt-3 tw-flex tw-flex-col">
      <v-btn
        v-for="(link, index) in routerLinks"
        :key="index"
        class="tw-w-full tw-justify-start tw-rounded-3xl tw-px-8 tw-py-3"
        :variant="currentRoute.path !== link.route ? 'text' : 'flat'"
        :class="{ 'tw-mb-3': index !== routerLinks.length - 1 }"
        :to="link.route"
      >
        <font-awesome-icon :icon="link.faIcon" class="tw-mr-6 tw-aspect-square tw-h-auto tw-w-6" />
        <span
          class="tw-text-lg"
          :class="currentRoute.path === link.route ? 'tw-font-bold' : 'tw-font-semibold'"
        >
          {{ $t(link.translationPath) }}
        </span>
      </v-btn>
    </div>
    <v-divider class="tw-m-3" />
    <div class="tw-flex tw-items-center tw-justify-between">
      <mobile-user-info />
      <logout-button />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import routerLinks from '@/components/layout/router-links';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { computed, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MobileUserInfo from '@/components/layout/mobile/MobileUserInfo.vue';
import LogoutButton from '@/components/layout/global-settings/LogoutButton.vue';

const currentRoute: ComputedRef<RouteLocationNormalizedLoaded> = computed(() => useRoute());
</script>
