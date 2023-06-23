<template>
  <v-form
    v-model="formValid"
    validate-on="input lazy"
    @submit.prevent="handleResetPassword"
    class="tw-flex tw-flex-col"
  >
    <v-alert
      border="start"
      variant="tonal"
      type="info"
      class="tw-mb-5 tw-shrink-0 tw-basis-auto tw-rounded-3xl"
    >
      {{ $t('auth.resetPassword.text') }}
    </v-alert>
    <text-input
      bg-color="nav-surface"
      :label="$t('auth.form.password')"
      v-model="newPassword"
      is-required
      sensitive
    />
    <text-input
      bg-color="nav-surface"
      :label="$t('auth.form.validationPassword')"
      v-model="validationPassword"
      sensitive
      is-required
      :validation-rules="[sameValue(newPassword, validationPassword)]"
    />
    <v-btn
      flat
      color="primary"
      type="submit"
      class="shadow-sm tw-mt-2 tw-w-full tw-rounded-3xl tw-p-3"
      :loading="loading"
    >
      <span class="tw-whitespace-normal tw-text-xl">
        {{ $t('auth.resetPassword.buttonLabel') }}
      </span>
    </v-btn>
  </v-form>
  <v-alert
    v-model="showFeedback"
    border="start"
    variant="tonal"
    :type="feedback.isError ? 'error' : 'success'"
    class="tw-mt-5 tw-w-full tw-shrink-0 tw-basis-auto tw-rounded-3xl"
    :title="feedbackTitle"
  >
    <p>{{ $t(feedback.messagePath) }}</p>
  </v-alert>
  <v-btn
    v-if="showLoginLink"
    flat
    color="secondary"
    class="tw-mt-5 tw-w-full tw-rounded-3xl tw-p-3"
    to="/auth/login"
  >
    <span class="tw-text-lg">{{ $t('auth.resetPassword.toLoginLabel') }}</span>
  </v-btn>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref, type Ref } from 'vue';
import type { RequestFeedback } from '@/services/types/common';
import { type Router, useRoute, useRouter } from 'vue-router';
import { AuthService } from '@/services/auth-service';
import TextInput from '@/components/common/TextInput.vue';
import { useI18n } from 'vue-i18n';
import { formRules } from '@/composables/form-rules';

const newPassword: Ref<string> = ref('');
const validationPassword: Ref<string> = ref('');
const formValid: Ref<boolean> = ref(false);
const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);
const loading: Ref<boolean> = ref(false);
const showFeedback: Ref<boolean> = ref(false);
const feedbackTitle: Ref<string> = ref('');
const showLoginLink: Ref<boolean> = ref(false);

const { query } = useRoute();
const router: Router = useRouter();
const { t } = useI18n();
const { sameValue } = formRules();

const authService: AuthService = new AuthService();

const handleResetPassword = async () => {
  if (!formValid.value) return;
  loading.value = true;
  Object.assign(
    feedback,
    await authService.resetPassword(
      query.userId as string,
      query.token as string,
      newPassword.value
    )
  );
  loading.value = false;
  showFeedback.value = true;
  feedbackTitle.value = feedback.isError
    ? t('auth.resetPassword.failedTitle')
    : t('auth.resetPassword.succeededTitle');
  showLoginLink.value = true;
};

onBeforeMount(async () => {
  if (!query.userId || !query.token) {
    await router.push('/register');
    return;
  }
});
</script>
