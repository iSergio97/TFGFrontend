<template>
  <div v-if="localSession === 0 || localSession === 1">
    <UserNavbar />
  </div>
  <div v-else>
    <AdminNavbar />
  </div>
  <Footer />
</template>

<script>
import UserNavbar from '@/components/UserNavbar.vue';
import AdminNavbar from '@/components/AdminNavBar.vue';
import Footer from '@/components/Footer.vue';
import { PMHSession } from '@/methods/PMHSession';

export default {
  name: 'App',
  components: {
    UserNavbar,
    AdminNavbar,
    Footer,
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
