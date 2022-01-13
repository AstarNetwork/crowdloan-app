import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Main from '@/views/Main.vue';
import ExternalHeader from '@/views/ExternalHeader.vue';
// import LeaderBoard from '@/views/LeaderBoard.vue';
import EarlyAdopter from '@/views/EarlyAdopter.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  // {
  //   path: '/leader-board',
  //   name: 'LeaderBoard',
  //   component: LeaderBoard
  // },
  // {
  //   path: '/early-adopter',
  //   name: 'EarlyAdopter',
  //   component: EarlyAdopter
  // },
  {
    path: '/external-header',
    name: 'ExternalHeader',
    component: ExternalHeader
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
