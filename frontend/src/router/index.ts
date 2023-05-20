import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import type { Router } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { useAuthStore } from '@/stores/auth.store';
import PlaylistsView from '@/views/PlaylistsView.vue';
import SummaryView from '@/views/SummaryView.vue';
import SettingsView from '@/views/SettingsView.vue';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: PlaylistsView,
    },
    {
      path: '/summary/:summaryId',
      name: 'summary',
      component: SummaryView,
      props: true,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  const publicPages: string[] = ['/login'];
  const authRequired: boolean = !publicPages.includes(to.path);
  // eslint-disable-next-line @typescript-eslint/typedef
  const authStore = useAuthStore();

  if (authRequired && !authStore.loggedIn) {
    authStore.returnUrl = to.fullPath;
    return '/login';
  }

  if (to.path === '/login' && authStore.loggedIn) {
    return '/';
  }
});

export default router;
