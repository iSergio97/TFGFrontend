<template>
  <Suspense>
    <template #default>
      <RequestFormComponent :userLogged="userLogged"/>
    </template>
    <template #fallback>
      <LoadingDiv/>
    </template>
  </Suspense>
</template>

<script>
import { ref } from 'vue';
import RequestFormComponent from '@/components/request/RequestFormComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';
import { PMHCrypto } from '@/methods/PMHCrypto';

export default {
  name: 'UserRequestNew',
  components: {
    RequestFormComponent,
    LoadingDiv,
  },
  setup() {
    const { decrypt } = PMHCrypto();
    const localUser = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
    const userLogged = ref(localUser);

    return {
      userLogged,
    };
  },
};
</script>

<style scoped>

</style>
