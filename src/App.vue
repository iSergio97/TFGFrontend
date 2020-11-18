<template>
  <div id="nav">
    <h1> Hola!</h1>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
};
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
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
