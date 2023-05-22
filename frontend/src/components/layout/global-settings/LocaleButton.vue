<template>
  <v-menu transition="slide-fade-y" :location="mdAndUp ? 'bottom center' : 'left'" offset="15rem">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="flat"
        color="nav-surface"
        class="shadow-sm tw-rounded-3xl tw-p-5"
      >
        <font-awesome-icon :icon="faEarthAmericas" class="tw-h-auto tw-w-6" />
      </v-btn>
    </template>
    <div class="bg-nav-surface shadow-md locale-options tw-flex tw-flex-col tw-rounded-3xl tw-p-5">
      <v-btn
        variant="text"
        v-for="(localeOption, index) in localeOptions"
        :key="index"
        class="tw-flex tw-justify-start tw-rounded-2xl tw-p-5"
        @click="setLocale(localeOption.value)"
      >
        <span :class="localeOption.icon" class="flag tw-mr-5 tw-aspect-square tw-rounded-full" />
        <span class="tw-text-lg">{{ localeOption.name }}</span>
      </v-btn>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import localeOptions from '@/components/layout/global-settings/locale-options';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useSetLocale } from '@/composables/set-locale';
import { useDisplay } from 'vuetify';

const { setLocale } = useSetLocale();

const { mdAndUp } = useDisplay();

const getNavigatorLang = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || 'en';

onMounted(() => {
  setLocale(localStorage.getItem('user-lang') || getNavigatorLang());
});
</script>
