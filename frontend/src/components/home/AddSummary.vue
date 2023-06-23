<template>
  <div class="tw-flex tw-w-full tw-max-w-[50rem] tw-flex-col">
    <text-input
      bg-color="surface"
      :label="$t('home.videoUrl')"
      v-model="urlInput"
      :error-messages="validationErrorMessages"
      validate-on="input"
      @update:user-input="handleInput"
      clearable
      persistent-clear
    />
    <v-progress-circular indeterminate v-if="loading && !showPreview" />
    <slide-from-left-to-right>
      <add-summary-preview
        v-if="showPreview"
        :video="videoFeedback.data as Video"
        @add-summary="handleAddSummary"
        :loading="loading"
      />
    </slide-from-left-to-right>
    <v-alert
      border="start"
      variant="tonal"
      :type="feedback.isError ? 'error' : 'success'"
      v-model="showAlert"
      closable
      class="tw-mt-5 tw-w-full tw-rounded-3xl"
    >
      {{ $t(feedback.messagePath) }}
    </v-alert>
  </div>
</template>
<script setup lang="ts">
import TextInput from '@/components/common/TextInput.vue';
import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import AddSummaryPreview from '@/components/home/AddSummaryPreview.vue';
import SlideFromLeftToRight from '@/components/transitions/SlideFromLeftToRight.vue';
import { formRules } from '@/composables/form-rules';
import { UsersService } from '@/services/users-service';
import { useAuthStore } from '@/stores/auth.store';
import type { RequestFeedback, Video } from '@/services/types/common';
import { VideosService } from '@/services/videos-service';
import type { IsValidYtUrlResponseBody } from '@/services/types/videos';

const emit: (event: string, ...args: string[]) => void = defineEmits(['addedNewVideo']);

const urlInput: Ref<string> = ref('');
const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);
const videoFeedback: RequestFeedback<Video> = reactive({} as RequestFeedback<Video>);
const validationErrorMessages: Ref<string[]> = ref([] as string[]);
const showPreview: Ref<boolean> = ref(false);
const showAlert: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

const { isValidYtUrl } = formRules();

const videosService: VideosService = new VideosService();

const { user } = useAuthStore();

const usersService: UsersService = new UsersService(user.id);

const validateUrlInput = async () => {
  const validationResult: string | IsValidYtUrlResponseBody = await isValidYtUrl(urlInput.value);
  if (typeof validationResult === 'string') {
    validationErrorMessages.value = [validationResult];
    return false;
  }
  if (!validationResult.ytVideoId) return false;

  validationErrorMessages.value = [];
  return validationResult.ytVideoId;
};

const fetchYtVideo = async (videoId: string) => {
  Object.assign(videoFeedback, await videosService.getVideo(videoId));

  if (videoFeedback.isError) {
    Object.assign(feedback, videoFeedback);
    showAlert.value = true;
    return;
  }

  showPreview.value = true;
};

const handleInput = async () => {
  showPreview.value = false;
  showAlert.value = false;
  validationErrorMessages.value = [];

  if (!urlInput.value) return;

  loading.value = true;
  const videoId: string | false = await validateUrlInput();
  loading.value = false;

  if (!videoId) return;

  loading.value = true;
  await fetchYtVideo(videoId);
  loading.value = false;
};

const handleAddSummary = async () => {
  if (!urlInput.value || validationErrorMessages.value.length) return;

  loading.value = true;
  Object.assign(feedback, await usersService.addVideo(urlInput.value));
  loading.value = false;
  showAlert.value = true;

  if (feedback.isError) return;
  urlInput.value = '';
  showPreview.value = false;

  emit('addedNewVideo');
};
</script>
