import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to.name);
  const session = Cookie.get('JSESSIONID');
  console.log(session);
  if (session === undefined && (to.name !== 'Login')) {
    if (to.name !== 'Home') {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (session !== undefined && to.name === 'Login') {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
