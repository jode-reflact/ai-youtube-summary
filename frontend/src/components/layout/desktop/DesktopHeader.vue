<template>
  <div class="tw-flex tw-flex-wrap tw-justify-between tw-py-7">
    <div
      v-if="currentRoute.path === '/'"
      class="tw-mr-4 tw-flex tw-grow tw-flex-col tw-justify-between tw-pb-7"
    >
      <span class="tw-text-5xl tw-font-bold">
        {{ t('layout.header.welcomeMessage.hello', { firstName: user.firstName }) }}
      </span>
      <span class="tw-mt-3 tw-opacity-75">{{ t('layout.header.welcomeMessage.welcomeBack') }}</span>
    </div>
    <span v-else class="tw-mr-2 tw-pb-7 tw-text-5xl tw-font-bold">
      {{ currentTitle }}
    </span>
    <div class="global-settings tw-flex tw-h-fit tw-items-center">
      <search-field class="tw-w-60" />
      <div class="tw-w-4" />
      <locale-button />
      <div class="tw-w-4" />
      <theme-button />
      <div class="tw-w-4" />
      <logout-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import LocaleButton from '@/components/layout/global-settings/LocaleButton.vue';
import ThemeButton from '@/components/layout/global-settings/ThemeButton.vue';
import { computed, type ComputedRef } from 'vue';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { useCurrentTitle } from '@/composables/current-title';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
import { useI18n } from 'vue-i18n';
import LogoutButton from '@/components/layout/global-settings/LogoutButton.vue';
import SearchField from '@/components/common/SearchField.vue';

const currentRoute: ComputedRef<RouteLocationNormalizedLoaded> = computed(() => useRoute());

const { currentTitle } = useCurrentTitle();
const { t } = useI18n();
// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
