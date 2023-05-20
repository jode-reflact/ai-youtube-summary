<template>
  <v-item-group v-model="currentLocale" class="tw-flex">
    <v-item v-for="(localeOption, index) in localeOptions" :key="index">
      <v-card
        :color="currentLocale.value === localeOption.value ? 'primary' : ''"
        @click="switchLocale(localeOption)"
        class="shadow-sm tw-rounded-3xl tw-p-3"
        :class="{ 'tw-mr-5': index !== localeOptions.length - 1 }"
      >
        <template #text>
          <div class="tw-mx-auto tw-w-10">
            <span
              :class="localeOption.icon"
              class="flag tw-aspect-square tw-w-full tw-rounded-3xl"
            />
          </div>
        </template>
        <template #title>
          <span>{{ localeOption.name }}</span>
        </template>
        <font-awesome-icon
          v-if="currentLocale.value === localeOption.value"
          class="tw-absolute tw-bottom-5 tw-right-5 tw-h-auto tw-w-7"
          :icon="faCheckCircle"
        />
      </v-card>
    </v-item>
  </v-item-group>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
import type { LocaleOption } from '@/components/layout/global-settings/locale-options';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import localeOptions from '@/components/layout/global-settings/locale-options';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSetLocale } from '@/composables/set-locale';

const { locale } = useI18n({ useScope: 'global' });

const { setLocale } = useSetLocale();

const currentLocale: Ref<LocaleOption> = ref(
  localeOptions.find((localeOption: LocaleOption) => localeOption.value === locale.value) ||
    ({} as LocaleOption)
);

const switchLocale = (newLocale: LocaleOption) => {
  currentLocale.value = newLocale;
  setLocale(newLocale.value);
};
</script>
