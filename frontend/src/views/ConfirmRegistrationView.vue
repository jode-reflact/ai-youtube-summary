<template>
  <div class="tw-w-full" v-if="!feedback.isError">
    <v-alert
      border="start"
      variant="tonal"
      type="success"
      class="tw-w-full tw-rounded-3xl"
      :title="$t('auth.confirmRegistration.succeededTitle')"
    >
      <p>{{ $t('auth.confirmRegistration.succeededText') }}</p>
    </v-alert>
    <v-btn flat color="primary" class="tw-mt-5 tw-w-full tw-rounded-2xl tw-p-3" to="/auth/login">
      <span class="tw-text-lg">{{ $t('auth.confirmRegistration.toLoginLabel') }}</span>
    </v-btn>
  </div>
  <div class="tw-w-full" v-else>
    <v-alert
      border="start"
      variant="tonal"
      type="error"
      class="tw-mb-5 tw-w-full tw-rounded-3xl"
      :title="$t('auth.confirmRegistration.failedTitle')"
    >
      <p>{{ $t('auth.confirmRegistration.failedText') }}</p>
      <p class="tw-mt-5">{{ $t('auth.resendMail.text') }}</p>
    </v-alert>
    <resend-mail-form />
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { AuthService } from '@/services/auth-service';
import type { RequestFeedback } from '@/services/types/common';
import { type Router, useRoute, useRouter } from 'vue-router';
import ResendMailForm from '@/components/auth/ResendMailForm.vue';

const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);

const { query } = useRoute();
const router: Router = useRouter();

const authService: AuthService = new AuthService();

const handleConfirm = async () => {
  if (!query.userId || !query.token) {
    await router.push('/register');
    return;
  }
  Object.assign(feedback, await authService.confirm(query.userId as string, query.token as string));
};

onBeforeMount(async () => {
  await handleConfirm();
});
</script>
