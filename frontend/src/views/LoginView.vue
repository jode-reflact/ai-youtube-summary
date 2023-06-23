<template>
  <v-form
    v-if="showLoginForm"
    v-model="formValid"
    validate-on="submit"
    @submit.prevent="handleLogin"
    class="tw-flex tw-flex-col"
  >
    <text-input bg-color="nav-surface" :label="$t('auth.form.email')" v-model="email" is-required />
    <text-input
      bg-color="nav-surface"
      class="tw-mt-4"
      :label="$t('auth.form.password')"
      v-model="password"
      is-required
      sensitive
    />
    <v-btn
      flat
      color="primary"
      type="submit"
      class="shadow-sm tw-mt-8 tw-w-full tw-rounded-3xl tw-p-3"
      :loading="loading"
    >
      <span class="tw-text-xl">{{ $t('auth.form.loginLabel') }}</span>
    </v-btn>
    <reset-password-button
      :email="email"
      @feedback="handleChildFeedback"
      class="tw-mx-auto tw-mt-5"
    />
  </v-form>
  <v-alert
    border="start"
    variant="tonal"
    :type="feedback.isError ? 'error' : 'success'"
    class="tw-w-full tw-shrink-0 tw-basis-auto tw-rounded-3xl"
    :class="{ 'tw-mt-8': showLoginForm }"
    v-model="showFeedback"
    :title="feedbackTitle"
    closable
  >
    {{ $t(feedback.messagePath) }}
  </v-alert>
  <resend-mail-form
    v-if="showResendMailForm"
    :email-value="email"
    @feedback="handleChildFeedback"
    class="tw-mt-5"
  />
  <v-divider class="tw-my-6" />
  <v-btn
    to="/auth/register"
    flat
    color="secondary"
    class="shadow-sm tw-w-full tw-rounded-3xl tw-p-3"
  >
    <span class="tw-text-xl">{{ $t('auth.login.toRegistrationLabel') }}</span>
  </v-btn>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import TextInput from '@/components/common/TextInput.vue';
import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import type { RequestFeedback } from '@/services/types/common';
import { AuthService } from '@/services/auth-service';
import type { AuthSuccessResponseBody } from '@/services/types/auth';
import ResendMailForm from '@/components/auth/ResendMailForm.vue';
import { useI18n } from 'vue-i18n';
import ResetPasswordButton from '@/components/auth/ResetPasswordButton.vue';

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const showLoginForm: Ref<boolean> = ref(true);
const formValid: Ref<boolean> = ref(false);
const feedback: RequestFeedback<AuthSuccessResponseBody> = reactive(
  {} as RequestFeedback<AuthSuccessResponseBody>
);
const feedbackTitle: Ref<string> = ref('');
const showFeedback: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

const showResendMailForm: Ref<boolean> = ref(false);

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();

const { t } = useI18n();

const authService: AuthService = new AuthService();

const handleLogin = async () => {
  showFeedback.value = false;
  if (!email.value || !password.value) return;

  loading.value = true;
  Object.assign(feedback, await authService.login(email.value, password.value));
  loading.value = false;

  if (feedback.isError || !feedback.data) {
    showFeedback.value = true;
    feedbackTitle.value = t('auth.login.failedTitle');
    if (feedback.messagePath === 'service.error.EMAIL_NOT_CONFIRMED') {
      showLoginForm.value = false;
      showResendMailForm.value = true;
    }
    return;
  }

  authStore.logIn(feedback.data?.accessToken, feedback.data?.refreshToken);
  await router.push(authStore.returnUrl || '/');
};

const handleChildFeedback = (childFeedback: RequestFeedback<Record<string, never>>) => {
  Object.assign(feedback, childFeedback);
  feedbackTitle.value = '';
  showFeedback.value = true;
};
</script>
