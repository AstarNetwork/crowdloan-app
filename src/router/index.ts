import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Main from '@/views/Main.vue';
import ExternalHeader from '@/views/ExternalHeader.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/external-header',
    name: 'ExternalHeader',
    component: ExternalHeader
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
