<template>
  <v-btn
    @click="toggleSearchOverlay()"
    variant="flat"
    color="nav-surface"
    class="shadow-sm tw-rounded-3xl tw-p-5"
  >
    <font-awesome-icon :icon="faSearch" class="tw-aspect-square tw-h-auto tw-w-6" />
  </v-btn>
  <v-overlay v-model="overlayOpened">
    <div class="tw-h-screen tw-w-screen tw-p-5 tw-backdrop-blur">
      <search-field
        v-click-outside="{
          handler: () => toggleSearchOverlay(),
        }"
        class="tw-mt-[25vh]"
      />
    </div>
  </v-overlay>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import type { Ref } from 'vue';
import { ref } from 'vue';
import SearchField from '@/components/common/SearchField.vue';

const overlayOpened: Ref<boolean> = ref(false);

const toggleSearchOverlay = () => (overlayOpened.value = !overlayOpened.value);
</script>
