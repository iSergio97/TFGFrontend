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
  name: 'CommonNavbar',
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

<style scoped>

</style>
