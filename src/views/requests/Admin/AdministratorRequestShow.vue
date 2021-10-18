<template>
  <br>
  <Suspense>
    <template #default>
      <RequestShowComponent :id="idRequest" />
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

<style>
.loading-spinner {
  margin: auto;
  padding-top: 15%;
}
</style>
