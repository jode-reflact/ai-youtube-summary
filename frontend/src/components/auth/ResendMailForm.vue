<template>
  <v-form v-model="isValid" validate-on="input" @submit.prevent="handleResendMail">
    <v-alert border="start" variant="tonal" type="info" class="tw-mb-5 tw-rounded-3xl">
      {{ $t('auth.resendMail.text') }}
    </v-alert>
    <text-input
      bg-color="nav-surface"
      :label="$t('auth.form.email')"
      v-model="emailInput"
      is-required
    />
    <v-btn
      flat
      color="primary"
      type="submit"
      class="shadow-sm tw-mt-2 tw-w-full tw-rounded-3xl tw-p-3"
      :loading="loading"
    >
      <span class="tw-whitespace-normal tw-text-xl">
        {{ $t('auth.resendMail.buttonLabel') }}
      </span>
    </v-btn>
  </v-form>
</template>
<script setup lang="ts">
import TextInput from '@/components/common/TextInput.vue';
import { reactive, ref, type Ref } from 'vue';
import type { RequestFeedback } from '@/services/types/common';
import { AuthService } from '@/services/auth-service';

const { emailValue = '' } = defineProps<{
  emailValue?: string;
}>();

const emit: (event: 'feedback', feedback: RequestFeedback<Record<string, never>>) => void =
  defineEmits<{
    (event: 'feedback', feedback: RequestFeedback<Record<string, never>>): void;
  }>();

const emailInput: Ref<string> = ref(emailValue);
const isValid: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const feedback: RequestFeedback<Record<string, never>> = reactive(
  {} as RequestFeedback<Record<string, never>>
);

const authService: AuthService = new AuthService();

const handleResendMail = async () => {
  Object.assign(feedback, {});
  if (!isValid.value || !emailInput.value) return;

  loading.value = true;
  Object.assign(feedback, await authService.resendConfirmationLink(emailInput.value));
  loading.value = false;

  emit('feedback', feedback);
};
</script>
