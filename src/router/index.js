import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import DatabaseError from '@/views/RouterError.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import AdministratorLogin from '@/views/AdministratorLogin.vue';

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
    path: '/administrator/login',
    name: 'AdministratorLogin',
    component: AdministratorLogin,
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
    name: 'UserRequestList',
    component: () => import('../views/requests/UserRequestList.vue'),
  },
  {
    path: '/user/requests/new',
    name: 'UserRequestNew',
    component: () => import('../views/requests/UserRequestNew.vue'),
  },
  {
    path: '/user/requests/show/:id',
    name: 'UserRequestShow',
    component: () => import('../views/requests/UserRequestShow.vue'),
  },
  {
    path: '/administrator/requests/list',
    name: 'RequestList',
    component: () => import('../views/requests/RequestList.vue'), // Listado de solicitudes
    alias: '/administrator/requests/list',
  },
  {
    path: '/administrator/requests/show/:id',
    name: 'RequestShow',
    component: () => import('../views/requests/RequestShow.vue'), // Show de la solicitud en cuestión
  },
  {
    path: '/administrator/operations/list',
    name: 'OperationList',
    component: () => import('../views/operations/OperationList.vue'),
  },
  {
    path: '/administrator/operations/show/:id',
    name: 'OperationShow',
    component: () => import('../views/operations/OperationShow.vue'),
  },
  {
    path: '/administrator/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
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
  if (session === undefined && !to.name.includes('Login')) {
    if (to.name !== 'Home') {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (session !== undefined && (to.name === 'Login' || to.name === 'AdministratorLogin')) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
