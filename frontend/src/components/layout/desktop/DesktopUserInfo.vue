<template>
  <v-btn class="tw-justify-start tw-rounded-3xl tw-p-2" variant="text">
    <v-list-item class="tw-p-4 tw-text-start">
      <template #prepend>
        <img class="tw-mr-3 tw-h-auto tw-w-14 tw-rounded-xl" :src="user.avatarSrc" alt="Avatar" />
      </template>
      <template #title>
        <span class="tw-font-bold">{{ user.firstName }} {{ user.lastName }}</span>
      </template>
      <template #subtitle>
        <span class="tw-block tw-overflow-hidden tw-text-ellipsis">{{ user.email }}</span>
      </template>
    </v-list-item>
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
