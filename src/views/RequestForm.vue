<template>
  <h1> Request component view </h1>
  <h3>
    {{id !== undefined ? id : 'Nuevo'}}
  </h3>
  <RequestFormComponent :convivientes="convivientes" />
</template>

<script>
import RequestFormComponent from '@/components/request/RequestFormComponent.vue';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';
import { ref } from 'vue';

export default {
  components: {
    RequestFormComponent,
  },
  name: 'RequestForm',
  setup() {
    const { decrypt } = PMHCrypto();
    const alertErrorStorage = ref(['Se ha producido un error con su sesión, debe iniciar sesión de nuevo', 'An error has occurred with your session, you will be logged out.']);
    const lang = Cookie.get('lang') !== undefined ? Cookie.get('lang') : 0;

    const lsSession = decrypt(localStorage.getItem('PMHSESSION'), localStorage.getItem('SALT'));
    const cookieSession = decrypt(Cookie.get('PMHSESSION'), Cookie.get('SALT'));
    if (lsSession !== cookieSession) {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }

    const rol = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT'));
    if (rol !== 'HABITANTE') {
      window.location.href = '/';
    }
    const convivientes = JSON.parse(localStorage.getItem('CONV'));

    return {
      convivientes,
    };
  },
};
</script>

<style scoped>

</style>
