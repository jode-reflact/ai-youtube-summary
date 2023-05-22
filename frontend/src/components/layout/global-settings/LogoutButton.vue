<template>
  <v-btn
    variant="text"
    class="logout-btn tw-rounded-3xl tw-p-5 hover:tw-bg-red-500 hover:tw-bg-opacity-80 hover:tw-text-white"
    @click="logOut()"
  >
    <font-awesome-icon
      :icon="faRightFromBracket"
      class="tw-aspect-square tw-h-auto tw-w-6 tw-opacity-[90]"
    />
  </v-btn>
</template>
<script setup lang="ts">
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

// eslint-disable-next-line @typescript-eslint/typedef
const authStore = useAuthStore();

const logOut = () => {
  authStore.logOut();
  router.push('/login');
};
</script>
