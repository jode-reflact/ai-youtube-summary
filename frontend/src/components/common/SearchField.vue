<template>
  <div
    class="tw-relative"
    v-click-outside="{
      handler: () => (suggestions = []),
    }"
  >
    <seach-input
      v-model:user-input="userInput"
      @update:user-input="setSuggestions()"
      @update:focused="setSuggestions()"
    />
    <slide-fade-y>
      <search-suggestions :suggestions="suggestions" />
    </slide-fade-y>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
import type { SummaryItem } from '../../../dummy/summaries';
import { ref, watch } from 'vue';
import { summaryItems } from '../../../dummy/summaries';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import SeachInput from '@/components/common/SeachInput.vue';
import SearchSuggestions from '@/components/common/SearchSuggestions.vue';
import SlideFadeY from '@/components/transitions/SlideFadeY.vue';

const route: RouteLocationNormalizedLoaded = useRoute();

const userInput: Ref<string> = ref('');
const suggestions: Ref<SummaryItem[]> = ref([]);
const loading: Ref<boolean> = ref(false);

const getSuggestions = (subString: string) => {
  return summaryItems.filter((summaryItem: SummaryItem) =>
    summaryItem.title.toLowerCase().includes(subString.toLowerCase())
  );
};

const setSuggestions = () => {
  if (userInput.value === '') {
    suggestions.value = [];
    return;
  }
  loading.value = true;
  suggestions.value = getSuggestions(userInput.value);
  loading.value = false;
};

watch(
  () => route.path,
  () => {
    userInput.value = '';
    setSuggestions();
  }
);
</script>
