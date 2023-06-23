<template>
  <v-btn
    variant="text"
    class="logout-btn tw-rounded-3xl tw-p-5 hover:tw-bg-red-500 hover:tw-bg-opacity-80 hover:tw-text-white"
    @click="dialogOpened = true"
    icon="fas fa-right-from-bracket"
  />
  <v-dialog width="auto" v-model="dialogOpened">
    <div class="bg-surface shadow-lg tw-flex tw-flex-col tw-rounded-2xl tw-p-10">
      <span class="tw-text-xl tw-font-bold"> {{ $t('auth.logOut.confirmQuestion') }} </span>
      <div class="tw-mt-10 tw-flex tw-justify-end">
        <v-btn variant="text" @click="dialogOpened = false" class="tw-mr-3 tw-rounded-2xl tw-p-3">
          <span class="tw-text-lg">{{ $t('general.cancel') }}</span>
        </v-btn>
        <v-btn
          variant="text"
          @click="handleLogOut"
          class="tw-rounded-2xl tw-bg-red-500 tw-bg-opacity-80 tw-p-3 tw-text-white"
          :loading="loading"
        >
          <span class="tw-text-lg">{{ $t('auth.logOut.confirmButton') }}</span>
        </v-btn>
      </div>
      <v-alert
        border="start"
        variant="tonal"
        type="error"
        :model-value="showError"
        class="tw-mt-5 tw-w-full tw-rounded-3xl"
      >
        <p>{{ $t('auth.error.logout') }}</p>
      </v-alert>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import type { RequestFeedback } from '@/services/types/common';
import { AuthService } from '@/services/auth-service';
import { type Router, useRouter } from 'vue-router';

const dialogOpened: Ref<boolean> = ref(false);
const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);
const loading: Ref<boolean> = ref(false);
const showError: Ref<boolean> = ref(false);

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();

const authService: AuthService = new AuthService();

const router: Router = useRouter();

const handleLogOut = async () => {
  showError.value = false;

  loading.value = true;
  Object.assign(feedback, await authService.logout());
  loading.value = false;

  if (feedback.isError) {
    showError.value = true;
    return;
  }

  dialogOpened.value = false;
  authStore.clearAuth();
  await router.push('auth');
};
</script>
