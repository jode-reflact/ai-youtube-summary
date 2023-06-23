<template>
  <div v-if="formVisible">
    <v-form
      v-model="formValid"
      validate-on="input lazy"
      @submit.prevent="handleRegistration"
      class="tw-flex tw-flex-col"
    >
      <text-input
        bg-color="nav-surface"
        :label="$t('auth.form.email')"
        v-model="email"
        is-required
      />
      <text-input
        bg-color="nav-surface"
        class="tw-mt-4"
        :label="$t('auth.form.password')"
        v-model="password"
        is-required
        sensitive
      />
      <text-input
        bg-color="nav-surface"
        class="tw-mt-4"
        :label="$t('auth.form.validationPassword')"
        v-model="validationPassword"
        :validation-rules="[sameValue(password, validationPassword)]"
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
        <span class="tw-text-xl">{{ $t('auth.form.registerLabel') }}</span>
      </v-btn>
    </v-form>
  </div>
  <v-alert
    border="start"
    variant="tonal"
    v-model="showFeedback"
    :type="feedback.isError ? 'error' : 'success'"
    class="tw-w-full tw-shrink-0 tw-basis-auto tw-rounded-3xl"
    :class="{ 'tw-mt-14': feedback.isError && formVisible }"
    :closable="feedback.isError"
    :title="feedbackTitle"
  >
    <p>{{ $t(feedback.messagePath) }}</p>
  </v-alert>
  <resend-mail-form
    v-if="showResendMailForm"
    :email-value="email"
    @feedback="handleResendMailFeedback"
    class="tw-mt-5"
  />
  <v-divider class="tw-my-6" />
  <v-btn to="/auth/login" flat color="secondary" class="shadow-sm tw-w-full tw-rounded-3xl tw-p-3">
    <span class="tw-text-xl">{{ $t('auth.register.toLoginLabel') }}</span>
  </v-btn>
</template>

<script setup lang="ts">
import TextInput from '@/components/common/TextInput.vue';
import ResendMailForm from '@/components/auth/ResendMailForm.vue';
import type { ComputedRef, Ref } from 'vue';
import { computed, reactive, ref } from 'vue';
import { AuthService } from '@/services/auth-service';
import { useI18n } from 'vue-i18n';
import type { RequestFeedback } from '@/services/types/common';
import { formRules } from '@/composables/form-rules';

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const validationPassword: Ref<string> = ref('');
const formValid: Ref<boolean> = ref(false);
const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);
const showFeedback: Ref<boolean> = ref(false);
const showResendMailForm: Ref<boolean> = ref(false);
const feedbackTitle: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

const formVisible: ComputedRef<boolean> = computed(
  () => (!Object.keys(feedback).length || feedback.isError) && !showResendMailForm.value
);

const { sameValue } = formRules();

const { t } = useI18n();

const authService: AuthService = new AuthService();

const handleRegistration = async () => {
  showFeedback.value = false;
  if (!formValid.value) return;

  loading.value = true;
  Object.assign(feedback, await authService.register(email.value, password.value));
  loading.value = false;
  showFeedback.value = true;

  feedbackTitle.value = feedback.isError
    ? t('auth.register.failedTitle')
    : t('auth.register.succeededTitle');

  showResendMailForm.value = !feedback.isError;
};

const handleResendMailFeedback = (resendMailFeedback: RequestFeedback<Record<string, never>>) => {
  Object.assign(feedback, resendMailFeedback);
  feedbackTitle.value = '';
  showFeedback.value = true;
};
</script>
