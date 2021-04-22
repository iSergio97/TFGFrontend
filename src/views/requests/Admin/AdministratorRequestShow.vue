<template>
  <RequestShowComponent :id="idRequest" />
</template>

<script>
import RequestShowComponent from '@/components/request/RequestShowComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    RequestShowComponent,
  },
  name: 'AdministratorRequestShow',
  setup() {
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
