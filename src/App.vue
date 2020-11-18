<template>
  <div id="nav">
    <h1> Hola!</h1>
  </div>
  <router-view/>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'App',
};
/*
// eslint-disable-next-line no-console
console.log('Carga script de App.vue');
axios.post('http://localhost:8080/operacion/administrador/new', {
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    cookieSession: 'Sergio',
    tipo: 'A',
  },
// eslint-disable-next-line no-console
}).then((res) => console.log(res));
 */
</script>

<style>

</style>
