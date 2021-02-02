import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import DatabaseError from '@/components/DatabaseError.vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/database-error',
    name: 'DatabaseError',
    component: DatabaseError,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
  },
  {
    path: '/administrator/system',
    name: 'Administrator',
    component: () => import('../components/Administrator.vue'),
  },
  {
    path: '/user/requests/list',
    name: 'RequestList',
    component: () => import('../components/RequestList.vue'),
  },
  {
    path: '/user/requests/new',
    name: 'RequestForm',
    component: () => import('../components/RequestForm.vue'),
  },
  {
    path: '/user/requests/:id',
    name: 'RequestForm',
    component: () => import('../components/RequestForm.vue'),
  },
  {
    path: '/user/operations/list',
    name: 'OperationList',
    component: () => import('../components/UserOperationList.vue'),
  },
  {
    path: '/user/operations/new',
    name: 'UserOperation',
    component: () => import('../components/UserOperationForm.vue'),
  },
  {
    path: '/user/operations/:id',
    name: 'UserOperation',
    component: () => import('../components/UserOperationForm.vue'),
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
  if (session === undefined && to.name === 'DatabaseError') {
    next();
    return;
  }
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
