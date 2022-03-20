/* eslint-disable */
<template>
  <div v-if="localSession === 0 || localSession === 1">
    <UserNavbar/>
  </div>
  <div v-else>
    <AdminNavbar/>
  </div>
</template>

<script>
import UserNavbar from '@/views/navbar/UserNavbar.vue';
import AdminNavbar from '@/views/navbar/AdminNavBar.vue';
import { PMHSession } from '@/methods/PMHSession';

export default {
  name: 'App',
  components: {
    UserNavbar,
    AdminNavbar,
  },
  setup() {
    const { localSession } = PMHSession('/user/profile');
    return { localSession };
  },
};
</script>

<style>
html,
body {
  font-family: "Open Sans", "Roboto", "Segoe UI", "GeezaPro", "DejaVu Serif", "sans-serif", "-apple-system", "BlinkMacSystemFont";
  height: 100%;
}

img {
  padding: 5px;
  border: 1px solid #ccc;
}

html {
  background: url(./images/v996-016.jpg) no-repeat center center;
  background-size: cover;
}

.tabs > p > a {
  border: 0;
}
</style>
