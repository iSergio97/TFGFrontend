<template>
  <h1> Estamos en RequestShowComponent </h1>
  <h3> idRequest: {{idRequest}}</h3>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'RequestShowComponent',
  props: {
    id: Number,
  },
  setup(props) {
    const idRequest = ref(props.id);
    // console.log('RequestShowComponent');
    return {
      idRequest,
    };
  },
};
</script>

<style scoped>

</style>
