<template>
  <div class="tw-h-full tw-py-5 tw-pl-5">
    <v-card
      color="nav-surface"
      class="shadow-lg desktop-navbar tw-float-left tw-flex tw-h-full tw-flex-col tw-rounded-3xl tw-p-5 tw-align-top tw-transition-all tw-duration-100"
      :class="collapsed ? 'tw-w-[6.35rem]' : 'tw-w-80'"
    >
      <v-btn
        to="/"
        class="tw-flex tw-w-full tw-justify-start tw-overflow-hidden tw-px-0 tw-opacity-100"
        :active="false"
        variant="plain"
      >
        <div class="tw-flex tw-w-full tw-items-center tw-p-2">
          <img src="/logoipsum-296.svg" alt="Logo" class="tw-aspect-square tw-w-12 tw-shrink-0" />
          <span
            class="tw-mb-1 tw-ml-5 tw-text-3xl tw-font-bold tw-transition-opacity"
            :class="collapsed ? 'tw-opacity-0' : 'tw-opacity-100'"
          >
            {{ appTitle }}
          </span>
        </div>
      </v-btn>

      <div class="tw-flex tw-w-full tw-grow tw-flex-col tw-items-start tw-justify-center">
        <desktop-nav-link
          v-for="(routerLink, index) in routerLinks"
          :key="index"
          :router-link="routerLink"
          :class="{ 'tw-mb-4': index !== routerLinks.length - 1 }"
        />
      </div>

      <v-btn
        variant="text"
        min-width="0"
        class="tw-ml-1.5 tw-mt-3 tw-flex tw-w-min tw-items-center tw-rounded-full tw-p-4"
        @click="sidebarStore.toggle()"
      >
        <font-awesome-icon
          class="tw-aspect-square"
          :rotation="!collapsed ? 180 : undefined"
          size="lg"
          :icon="faCaretRight"
        />
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import routerLinks from '@/components/layout/router-links';
import { useSidebarStore } from '@/stores/layout/desktop/sidebar.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { storeToRefs } from 'pinia';
import DesktopNavLink from '@/components/layout/desktop/DesktopNavLink.vue';

const appTitle: string = import.meta.env.VITE_APP_TITLE;

// eslint-disable-next-line @typescript-eslint/typedef
const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);
</script>
