<template>
  <footer class="card-footer-item">
    <p> Trabajo de Fin de Grado {{fechaRango}} - <strong> PMH </strong> -
      <a href="https://github.com/iSergio97">Sergio Garrido Domínguez </a> - Todos los derechos reservados. &copy;</p>
  </footer>
</template>

<script>
import { watchEffect, computed } from 'vue';

export default {
  name: 'Footer',
  setup() {
    const fecha = new Date().getFullYear();
    watchEffect(() => fecha);
    /* eslint-disable */
    const fechaRango = computed(() => {`2020-${fecha}`});
    /* eslint-enable */
    return {
      fechaRango,
    };
  },
};
</script>

<style scoped>
footer {
  background-color: lightgray;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
