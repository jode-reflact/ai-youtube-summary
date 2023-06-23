<template>
  <v-dialog v-model="isOpen" persistent width="auto">
    <div class="bg-surface shadow-lg tw-flex tw-flex-col tw-rounded-2xl tw-p-10">
      <span class="tw-text-xl tw-font-bold"> {{ $t('auth.error.title') }} </span>
      <p class="tw-text-lg">{{ $t(authErrorMessagePath) }}</p>
      <div class="tw-mt-10 tw-flex tw-justify-end">
        <v-btn
          variant="flat"
          color="primary"
          @click="handleClose"
          class="tw-rounded-2xl tw-bg-opacity-80 tw-p-3 tw-text-white"
        >
          <span class="tw-text-lg">{{ $t('auth.error.toLoginLabel') }}</span>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
import { type Router, useRouter } from 'vue-router';

const isOpen: Ref<boolean> = ref(false);

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();
const { authErrorMessagePath } = storeToRefs(authStore);

const router: Router = useRouter();

const handleClose = () => {
  isOpen.value = false;
  authStore.clearAuth();
  router.push('/auth');
};

watchEffect(() => {
  isOpen.value = authErrorMessagePath.value !== '';
});
</script>
