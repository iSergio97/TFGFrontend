<template>
  <Suspense>
    <template #default>
      <RequestFormComponent :userLogged="userLogged" />
    </template>
    <template #fallback>
      <LoadingDiv />
    </template>
  </Suspense>
</template>

<script>
import { ref } from 'vue';
import RequestFormComponent from '@/components/request/RequestFormComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';

export default {
  name: 'UserRequestNew',
  components: {
    RequestFormComponent,
    LoadingDiv,
  },
  setup() {
    const localUser = JSON.parse(localStorage.getItem('USER_PRO'));
    const userLogged = ref(localUser);

    return {
      userLogged,
    };
  },
};
</script>

<style scoped>

</style>
