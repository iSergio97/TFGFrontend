<template>
  <h1> Request component view </h1>
  <h3>
    {{
      $route.params.id !== undefined ? 'Entro con ID a RequestForm' : 'Entro sin ID a RequestForm'
    }}
  </h3>
</template>

<script>
export default {
  name: 'Request',
};
</script>

<style scoped>

</style>
