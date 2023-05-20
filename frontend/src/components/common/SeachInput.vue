<template>
  <v-text-field
    :label="$t('general.searchLabel')"
    variant="solo-filled"
    hide-details="auto"
    class="shadow-sm tw-h-full tw-w-full tw-rounded-3xl"
    flat
    bg-color="nav-surface"
    v-model="userInputValue"
    @update:focused="emit('update:focused')"
  >
    <template #append-inner>
      <div class="tw-mr-1 tw-h-full tw-p-5">
        <font-awesome-icon :icon="faSearch" class="tw-h-full tw-opacity-75" />
      </div>
    </template>
  </v-text-field>
</template>
<script setup lang="ts">
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, type WritableComputedRef } from 'vue';

const { userInput } = defineProps<{
  userInput: string;
}>();

const emit: (event: string, ...args: string[]) => void = defineEmits([
  'update:focused',
  'update:userInput',
]);

const userInputValue: WritableComputedRef<string> = computed({
  get: () => {
    return userInput;
  },
  set: (value: string) => {
    emit('update:userInput', value);
  },
});
</script>
