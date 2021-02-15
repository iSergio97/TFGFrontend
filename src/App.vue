<template>
  <div v-if="localSession === 0 || localSession === 1">
    <UserNavbar />
  </div>
  <div v-else>
    <AdminNavbar />
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
html {
  background-color: #F8F8FF;
}
</style>
