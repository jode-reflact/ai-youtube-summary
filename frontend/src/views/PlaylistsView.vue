<template>
  <content-section
    v-for="(playlist, playlistName, index) in summaryItemsByPlaylist"
    :key="index"
    :divider="index !== Object.keys(summaryItemsByPlaylist).length - 1"
  >
    <template #title>{{ playlistName }}</template>
    <summary-slider :summary-items="playlist" />
  </content-section>
</template>
<script setup lang="ts">
import SummarySlider from '@/components/common/SummarySlider.vue';
import ContentSection from '@/components/layout/ContentSection.vue';
import { fetchPlaylists, type ItemsByPlaylist } from '@/services/fetch-playlists';

const summaryItemsByPlaylist: ItemsByPlaylist = fetchPlaylists();
</script>
