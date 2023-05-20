<template>
  <v-btn
    class="tw-w-full tw-justify-start tw-overflow-hidden tw-rounded-3xl tw-px-5 tw-py-4 tw-text-lg"
    :class="{
      'shadow-sm-primary tw-font-bold': currentRoute.path === routerLink.route,
    }"
    :variant="currentRoute.path !== routerLink.route ? 'text' : 'flat'"
    :to="routerLink.route"
  >
    <div class="tw-flex">
      <font-awesome-icon
        class="-tw-ml-[0.05rem] tw-aspect-square tw-h-auto tw-w-6"
        :icon="routerLink.faIcon"
      />
      <span
        class="tw-mb-0.5 tw-ml-5 tw-text-xl tw-transition-opacity"
        :class="collapsed ? 'tw-opacity-0' : 'tw-opacity-100'"
      >
        {{ $t(routerLink.translationPath) }}
      </span>
    </div>
  </v-btn>
</template>
<script setup lang="ts">
import type { RouterLink } from '@/components/layout/router-links';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, type ComputedRef } from 'vue';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { useSidebarStore } from '@/stores/layout/desktop/sidebar.store';
import { storeToRefs } from 'pinia';

defineProps<{
  routerLink: RouterLink;
}>();

const currentRoute: ComputedRef<RouteLocationNormalizedLoaded> = computed(() => useRoute());

// eslint-disable-next-line @typescript-eslint/typedef
const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);
</script>
