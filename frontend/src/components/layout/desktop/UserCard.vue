<template>
  <div class="tw-h-full tw-w-[26rem] tw-flex-shrink-0 tw-p-5 tw-pl-0">
    <v-card
      variant="flat"
      class="bg-soft tw-flex tw-h-full tw-w-full tw-flex-col tw-rounded-3xl tw-p-5"
    >
      <user-info />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import UserInfo from '@/components/layout/desktop/DesktopUserInfo.vue';
</script>
