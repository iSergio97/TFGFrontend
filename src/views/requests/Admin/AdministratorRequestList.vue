<template>
  <Suspense>
    <template #default>
      <h3> Admin Request List</h3>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <Loading />
      </div>
    </template>
  </Suspense>
</template>

<script>
export default {
  name: 'AdministratorRequestList',
  // TODO: REVISAR SI ESTAMOS EN ADMIN O EN USUARIO PARA LISTAR TODO O EN FUNCIÓN DEL USUARIO
};
</script>

<style scoped>

</style>
