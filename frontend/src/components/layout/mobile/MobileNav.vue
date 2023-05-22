<template>
  <v-fade-transition>
    <div v-if="mobileMenuExpanded" class="tw-fixed tw-z-20 tw-h-full tw-w-full tw-backdrop-blur" />
  </v-fade-transition>
  <div
    v-click-outside="{
      handler: closeMobileMenu,
      closeConditional: () => mobileMenuExpanded,
    }"
    class="tw-fixed tw-z-50 tw-h-32 tw-w-full tw-rounded-3xl tw-p-5"
  >
    <v-card
      color="nav-surface"
      class="shadow-lg tw-flex tw-h-full tw-items-center tw-rounded-3xl tw-px-6 tw-py-4"
    >
      <router-link to="/" class="tw-flex tw-shrink-0">
        <img src="/logoipsum-296.svg" alt="Logo" />
      </router-link>
      <span
        class="tw-shrink tw-overflow-hidden tw-truncate tw-whitespace-nowrap tw-px-6 tw-text-2xl tw-font-semibold"
        >{{ currentTitle }}</span
      >
      <v-btn
        @click="toggleMobileMenu()"
        variant="text"
        class="tw-ml-auto tw-flex tw-min-w-fit tw-rounded-3xl tw-p-4"
      >
        <font-awesome-icon
          :icon="mobileMenuExpanded ? faClose : faBars"
          class="tw-aspect-square"
          size="xl"
        />
      </v-btn>
    </v-card>
    <Transition name="slide-y-transition">
      <mobile-menu v-if="mobileMenuExpanded" ref="mobileMenu" />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import MobileMenu from '@/components/layout/mobile/MobileMenu.vue';
import { type RouterLink } from '@/components/layout/router-links';
import { computed, type ComputedRef, ref, type Ref, watch } from 'vue';
import { useCurrentTitle } from '@/composables/current-title';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

const mobileMenuExpanded: Ref<boolean> = ref(false);
const toggleMobileMenu = () => {
  mobileMenuExpanded.value = !mobileMenuExpanded.value;
};
const closeMobileMenu = () => (mobileMenuExpanded.value = false);

const { currentTitle } = useCurrentTitle();

const currentRoute: ComputedRef<RouteLocationNormalizedLoaded> = computed(() => useRoute());

watch(
  () => currentRoute.value.path,
  () => closeMobileMenu()
);
</script>
