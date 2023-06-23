<template>
  <v-btn variant="plain" @click="handleResetPassword">{{
    $t('auth.login.forgotPasswordLabel')
  }}</v-btn>
</template>
<script setup lang="ts">
import { AuthService } from '@/services/auth-service';
import type { RequestFeedback } from '@/services/types/common';

const { email } = defineProps<{ email: string }>();
const emit: (event: 'feedback', feedback: RequestFeedback<Record<string, never>>) => void =
  defineEmits<{
    (event: 'feedback', feedback: RequestFeedback<Record<string, never>>): void;
  }>();

const authService: AuthService = new AuthService();

const handleResetPassword = async () => {
  if (!email) return;
  const feedback: RequestFeedback<Record<string, never>> = await authService.requestPasswordReset(
    email
  );
  emit('feedback', feedback);
};
</script>
