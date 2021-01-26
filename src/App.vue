<template>
<UserNavbar />
</template>

<script>
import UserNavbar from '@/components/UserNavbar.vue';
import Cookie from 'js-cookie';

export default {
  name: 'App',
  components: {
    UserNavbar,
  },
  setup() {
    const session = Cookie.get('PMHSESSION');

    return { session };
  },
};
</script>

<style>
html {
  background-color: #F8F8FF;
}
</style>
