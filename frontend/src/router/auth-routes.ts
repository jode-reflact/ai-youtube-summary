import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ConfirmRegistrationView from '@/views/ConfirmRegistrationView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';

const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: LoginView,
  },
  {
    path: 'register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: 'confirm-registration',
    name: 'confirmRegistration',
    component: ConfirmRegistrationView,
  },
  {
    path: 'reset-password',
    name: 'resetPassword',
    component: ResetPasswordView,
  },
];

export default authRoutes;
