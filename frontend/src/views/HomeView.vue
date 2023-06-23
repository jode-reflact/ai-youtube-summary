<template>
  <content-section title-icon="fas fa-add">
    <template #title>{{ $t('home.addNewSummary') }}</template>
    <add-summary @added-new-video="fetchVideos" />
  </content-section>
  <pending-summaries-section :feedback="feedback" />
  <finished-summaries-section :feedback="feedback" />
</template>

<script setup lang="ts">
import ContentSection from '@/components/layout/ContentSection.vue';
import AddSummary from '@/components/home/AddSummary.vue';
import { onMounted, reactive } from 'vue';
import PendingSummariesSection from '@/components/home/PendingSummariesSection.vue';
import type { RequestFeedback, Video } from '@/services/types/common';
import { useAuthStore } from '@/stores/auth.store';
import { UsersService } from '@/services/users-service';
import FinishedSummariesSection from '@/components/home/FinishedSummariesSection.vue';

const feedback: RequestFeedback<Video[]> = reactive({} as RequestFeedback<Video[]>);

const { user } = useAuthStore();
const usersService: UsersService = new UsersService(user.id);

const fetchVideos = async () => {
  Object.assign(feedback, await usersService.getVideos());
};

onMounted(async () => {
  await fetchVideos();
});
</script>
