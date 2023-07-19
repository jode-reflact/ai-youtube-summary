import {createRouter, createWebHashHistory, type RouteLocationNormalized} from 'vue-router';
import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import authRoutes from '@/router/auth-routes';
import AppLayout from '@/components/layout/AppLayout.vue';
import appRoutes from '@/router/app-routes';
import AuthLayout from '@/components/layout/AuthLayout.vue';

const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // eslint-disable-next-line @typescript-eslint/typedef
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/auth',
      name: 'authentication',
      component: AuthLayout,
      redirect: '/auth/login',
      children: [...authRoutes],
    },
    {
      path: '/',
      name: 'app',
      component: AppLayout,
      children: [...appRoutes],
    },
  ],
});

router.beforeEach((to: RouteLocationNormalized) => {
  const authPages: string[] = [
    '/auth/login',
    '/auth/register',
    '/auth/confirm-registration',
    '/auth/reset-password',
  ];
  const authRequired: boolean = !authPages.includes(to.path);

  // eslint-disable-next-line @typescript-eslint/typedef
  const authStore = useAuthStore();

  if (authRequired && !authStore.loggedIn) {
    authStore.returnUrl = to.fullPath;
    return '/auth';
  }

  if (!authRequired && authStore.loggedIn) {
    return '/';
  }
});

export default router;
