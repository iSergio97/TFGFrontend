<template>
  <h1> OperationNew component view </h1>
  <h3>
    {{
      $route.params.id !== undefined ? 'Entro con ID OperationForm' : 'Entro sin ID OperationForm'
    }}
  </h3>
</template>

<script>
export default {
  name: 'Operation',
};
</script>

<style scoped>

</style>
