<template>
  <v-text-field
    variant="solo-filled"
    class="shadow-sm tw-relative tw-w-full tw-rounded-3xl"
    :class="{ 'tw-mb-8': isRequired || validationRules }"
    flat
    v-model="userInput"
    @update:focused="emit('update:focused')"
    @update:model-value="emit('update:user-input')"
    :rules="getRules()"
    :type="hideText ? 'password' : 'text'"
  >
    <template v-if="sensitive" #append-inner>
      <v-icon
        :icon="hideText ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click="hideText = !hideText"
        class="tw-mr-3"
      />
    </template>
  </v-text-field>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { FormRule } from '@/composables/form-rules';
import { formRules } from '@/composables/form-rules';
import { VTextField } from 'vuetify/components';

const { validationRules, isRequired, sensitive } = defineProps<{
  isRequired?: boolean;
  validationRules?: FormRule<string>[];
  sensitive?: boolean;
}>();

const hideText: Ref<boolean> = ref(sensitive);
const isValid: Ref<boolean> = ref(false);

const userInput: Ref<string | undefined> = defineModel<string>();

const emit: { (event: 'update:focused'): void; (event: 'update:user-input'): void } = defineEmits<{
  (event: 'update:focused'): void;
  (event: 'update:user-input'): void;
}>();

defineExpose({ isValid });

const { required } = formRules();

const getRules = () => {
  const rules: FormRule<string>[] = [];
  if (isRequired) {
    rules.push(required);
  }
  if (validationRules?.length) {
    rules.push(...validationRules);
  }
  return rules;
};
</script>
