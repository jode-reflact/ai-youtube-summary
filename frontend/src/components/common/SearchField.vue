<template>
  <div
    class="tw-relative"
    v-click-outside="{
      handler: () => (suggestionsOpened = false),
    }"
  >
    <text-input
      :label="$t('general.searchLabel')"
      append-inner-icon="fas fa-search"
      v-model="userInput"
      @update:focused="suggestionsOpened = true"
      @update:user-input="fetchSuggestions"
    />
    <slide-fade-y v-if="mdAndUp">
      <div
        class="shadow-md bg-nav-surface tw-absolute -tw-left-36 tw-top-20 tw-z-10 tw-flex tw-max-h-[50vh] tw-w-[36rem] tw-flex-col tw-rounded-3xl tw-p-5"
        v-if="userInput && suggestionsOpened"
      >
        <v-alert
          v-if="feedback.isError"
          border="start"
          variant="tonal"
          type="error"
          class="tw-rounded-3xl"
        >
          {{ $t(feedback.messagePath) }}
        </v-alert>
        <span v-else-if="userInput && !suggestions.length" class="tw-ml-3">
          {{ $t('general.searchNoResults') }}
        </span>
        <search-suggestions
          v-else-if="suggestions.length"
          @suggestion-clicked="suggestionId => suggestionClickHandler(suggestionId)"
          :video-suggestions="suggestions"
        />
      </div>
    </slide-fade-y>
    <slide-fade-y v-else>
      <div class="tw-mt-5 tw-flex tw-w-full tw-flex-col" v-if="userInput && suggestionsOpened">
        <v-alert
          v-if="feedback.isError"
          border="start"
          variant="tonal"
          type="error"
          class="tw-w-full tw-rounded-3xl"
        >
          {{ $t(feedback.messagePath) }}
        </v-alert>
        <span class="tw-mx-auto" v-else-if="userInput && !suggestions.length">
          {{ $t('general.searchNoResults') }}
        </span>
        <search-suggestions
          v-else-if="suggestions.length"
          @suggestion-clicked="suggestionId => suggestionClickHandler(suggestionId)"
          :video-suggestions="suggestions"
          class="tw-min-h-0"
        />
      </div>
    </slide-fade-y>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import TextInput from '@/components/common/TextInput.vue';
import SearchSuggestions from '@/components/common/SearchSuggestions.vue';
import SlideFadeY from '@/components/transitions/SlideFadeY.vue';
import { useDisplay } from 'vuetify';
import router from '@/router';
import { UsersService } from '@/services/users-service';
import { useAuthStore } from '@/stores/auth.store';
import type { RequestFeedback, Video } from '@/services/types/common';
import { filterVideosByTitle } from '@/helpers/videos';

const userInput: Ref<string> = ref('');
const feedback: RequestFeedback<Video[]> = reactive({} as RequestFeedback<Video[]>);
const suggestions: Ref<Video[]> = ref([]);
const suggestionsOpened: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

const { mdAndUp } = useDisplay();

const emit: (event: 'suggestionClicked') => void = defineEmits<{
  (event: 'suggestionClicked'): void;
}>();

const { user } = useAuthStore();

const usersService: UsersService = new UsersService(user.id);

const fetchSuggestions = async () => {
  if (userInput.value === '') {
    suggestionsOpened.value = false;
    return;
  }

  loading.value = true;
  Object.assign(feedback, await usersService.getVideos());
  loading.value = false;

  if (feedback.isError || !feedback.data?.length) return;

  loading.value = true;
  suggestions.value = filterVideosByTitle(userInput.value, feedback.data);
  loading.value = false;
};

const suggestionClickHandler = (summaryId: string) => {
  userInput.value = '';
  suggestionsOpened.value = false;
  router.push(`/summary/${summaryId}`);
  emit('suggestionClicked');
};
</script>
