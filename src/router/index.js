import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Operation from '@/components/Operation.vue';
import Request from '../components/Request.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
  },
  {
    path: '/administrator',
    name: 'Administrator',
    component: () => import('../components/Administrator.vue'),
  },
  {
    path: '/requests',
    name: 'Request',
    component: Request,
  },
  {
    path: '/operations',
    name: 'Operation',
    component: Operation,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  /* {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ /* '../views/About.vue'),
  }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
