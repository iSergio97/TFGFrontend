<template>
  <div v-if="localSession === 0 || localSession === 1">
    <UserNavbar />
  </div>
  <div v-else>
    <AdminNavbar />
  </div>
</template>

<script>
// import axios from 'axios';
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
    // axios.get('http://localhost:8080/sistema/administrador/prueba')
    //   .then((res) => { console.log(res.data.object); });

    return { localSession };
  },
};
</script>

<style>
html {
  background-color: #F8F8FF;
}
</style>
