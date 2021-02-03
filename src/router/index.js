import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import DatabaseError from '@/views/DatabaseError.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

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
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/administrator/system',
    name: 'Administrator',
    component: () => import('../views/Administrator.vue'),
  },
  {
    path: '/user/requests/list',
    name: 'RequestList',
    component: () => import('../views/RequestList.vue'),
  },
  {
    path: '/user/requests/new',
    name: 'RequestForm',
    component: () => import('../views/RequestForm.vue'),
  },
  {
    path: '/user/requests/:id',
    name: 'RequestForm',
    component: () => import('../views/RequestForm.vue'),
  },
  {
    path: '/user/operations/list',
    name: 'OperationList',
    component: () => import('../views/UserOperationList.vue'),
  },
  {
    path: '/user/operations/new',
    name: 'UserOperation',
    component: () => import('../views/UserOperationForm.vue'),
  },
  {
    path: '/user/operations/:id',
    name: 'UserOperation',
    component: () => import('../views/UserOperationForm.vue'),
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
