<template>
  <v-overlay class="tw-backdrop-blur" v-model="overlayOpened">
    <slide-up>
      <div v-if="menuOpened" class="shadow-md tw-z-20 tw-flex tw-h-screen tw-w-screen tw-flex-col">
        <div class="tw-h-[30vh] tw-shrink-0" />
        <div
          class="shadow-md bg-nav-surface tw-flex tw-min-h-0 tw-grow tw-flex-col tw-rounded-t-3xl tw-p-10"
          v-click-outside="{
            handler: closeSearch,
          }"
        >
          <div class="tw-mb-8 tw-flex tw-w-full tw-items-center tw-justify-between">
            <span class="tw-text-2xl tw-font-bold">{{ $t('general.searchTitle') }}</span>
            <v-btn
              variant="text"
              class="tw-rounded-full tw-p-3"
              icon="fas fa-close"
              @click="closeSearch"
            />
          </div>
          <search-field class="tw-min-h-0" @suggestion-clicked="closeSearch" />
        </div>
      </div>
    </slide-up>
  </v-overlay>
</template>
<script setup lang="ts">
import SearchField from '@/components/common/SearchField.vue';
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import SlideUp from '@/components/transitions/SlideUp.vue';

const emit: (event: 'closeSearch') => void = defineEmits<{
  (event: 'closeSearch'): void;
}>();

const overlayOpened: Ref<boolean> = ref(true);
const menuOpened: Ref<boolean> = ref(false);

const closeOverlay = () => {
  overlayOpened.value = false;
  emit('closeSearch');
};

const closeSearch = () => {
  menuOpened.value = false;
  setTimeout(closeOverlay, 200);
};

onMounted(() => {
  menuOpened.value = true;
});
</script>
