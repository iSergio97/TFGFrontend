<template>
  <h1> OperationNew component view </h1>
  <h3>
    {{
      id !== undefined ? 'Entro con ID OperationForm' : 'Entro sin ID OperationForm'
    }}
    <h4> {{id}}</h4>
  </h3>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'OperationForm',
  setup() {
    /* eslint-disable */
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;
    return {
      id
    };
  },
};
</script>

<style scoped>

</style>
