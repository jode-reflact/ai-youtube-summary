import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SummaryView from '@/views/SummaryView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const appRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/summary/:ytVideoId',
    name: 'summary',
    component: SummaryView,
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

export default appRoutes;
