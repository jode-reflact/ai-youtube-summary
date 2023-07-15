<template>
  <content-section v-if="!feedback.isError && !!feedback.data">
    <template #title>{{ feedback.data.metadata.title }}</template>
    <div class="tw-flex" :class="{ 'tw-flex-col': mdAndDown }">
      <p class="tw-grow tw-basis-1/2 tw-text-justify tw-text-lg">
        {{ feedback.data.summary }}
      </p>
      <div
        class="tw-flex"
        :class="{
          'tw-flex-col': smAndDown,
          'tw-mt-10': mdAndDown,
          'tw-basis-1/2 tw-pl-10': lgAndUp,
        }"
      >
        <summary-video-info
          :class="smAndDown ? 'tw-mb-10' : 'tw-mr-3 tw-basis-1/2'"
          :video="feedback.data"
        />
        <summary-video-link
          :class="smAndDown ? '' : 'tw-ml-3 tw-basis-1/2'"
          :video="feedback.data"
        />
      </div>
    </div>
  </content-section>
</template>
<script setup lang="ts">
import ContentSection from '@/components/layout/ContentSection.vue';
import { onBeforeMount, reactive, watch } from 'vue';
import { type Router, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import SummaryVideoLink from '@/components/summary/SummaryVideoLink.vue';
import SummaryVideoInfo from '@/components/summary/SummaryVideoInfo.vue';
import { VideosService } from '@/services/videos-service';
import type { RequestFeedback, Video } from '@/services/types/common';

const { ytVideoId } = defineProps<{
  ytVideoId: string;
}>();

const { smAndDown, mdAndDown, lgAndUp } = useDisplay();

const feedback: RequestFeedback<Video> = reactive({} as RequestFeedback<Video>);

const router: Router = useRouter();

const videosService: VideosService = new VideosService();

const fetchVideoData = async () => {
  const videoFeedback: RequestFeedback<Video> = await videosService.getVideo(ytVideoId);
  if (videoFeedback.isError || !videoFeedback.data?.summary) {
    await router.push('/');
    return;
  }
  Object.assign(feedback, videoFeedback);
};

onBeforeMount(() => {
  fetchVideoData();
});

watch(() => ytVideoId, fetchVideoData);
</script>
