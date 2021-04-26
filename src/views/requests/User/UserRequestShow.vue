<template>
  <br>
  <Suspense>
    <template #default>
      <RequestShowComponent :id="idRequest"/>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <LoadingDiv />
      </div>
    </template>
  </Suspense>
</template>

<script>
import RequestShowComponent from '@/components/request/RequestShowComponent.vue';
import { ref } from 'vue';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';
import { useRoute } from 'vue-router';

export default {
  name: 'UserRequestShow',
  components: { RequestShowComponent },
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
    // Se ha optado por reutilizar este módulo
    const route = useRoute();
    const idRequest = ref(Number(route.params.id));

    return {
      idRequest,
    };
  },
};
</script>

<style scoped>

</style>
