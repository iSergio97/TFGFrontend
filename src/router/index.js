import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';

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
    path: '/requests/list',
    name: 'RequestList',
    component: () => import('../components/RequestList.vue'),
  },
  {
    path: '/requests/new',
    name: 'RequestForm',
    component: () => import('../components/RequestForm.vue'),
  },
  {
    path: '/requests/:id',
    name: 'RequestForm',
    component: () => import('../components/RequestForm.vue'),
  },
  {
    path: '/operations/list',
    name: 'OperationList',
    component: () => import('../components/OperationList.vue'),
  },
  {
    path: '/operations/new',
    name: 'Operation',
    component: () => import('../components/OperationForm.vue'),
  },
  {
    path: '/operations/:id',
    name: 'Operation',
    component: () => import('../components/OperationForm.vue'),
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
  const session = Cookie.get('PMHSESSION');
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
