<template>
  <div class='column is-6-tablet is-4-mobile has-text-centered'>
    <div class="card">
      <div class="card-content">
        <p class="title">
          Convivientes
        </p>
        <p v-if="convivientes.length === 0">
          Actualmente no convive con nadie
        </p>
        <p class="subtitle" v-else v-for="(conviviente, index) in convivientes" :key="index">
          {{conviviente.nombre}} {{conviviente.primerApellido}} {{conviviente.segundoApellido}}
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          Los convivientes son las personas que viven contigo.
          Si uno de los que aparece aquí es menor, las personas mayores de edad pueden
          realizar una solicitud de edición de datos por el menor de edad.
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConvivientesCard',
  props: {
    convivientes: Array,
  },
};
</script>

<style scoped>
body {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.card.is-horizontal {
  display: flex;
}
.card.is-horizontal .card-image {
  width: 100%;
  height: 100%;
}
.card.is-horizontal .card-stacked {
  flex-direction: column;
  flex: 1 1 auto;
  display: flex;
  position: relative;
}
.card.is-horizontal .card-stacked .card-content {
  flex-grow: 1;
}
.card.is-fullimage {
  background-color: transparent;
}
.card.is-fullimage .card-image {
  color: #fff !important;
}
.card.is-fullimage .card-image .card-stacked {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%);
  text-shadow: 0px 0px 2px #000000;
}
.card.is-fullimage .card-image .card-stacked .card-footer {
  border-color: transparent;
}
.card.is-fullimage .card-image .card-stacked .title,
.card.is-fullimage .card-image .card-stacked .subtitle {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a:hover {
  text-decoration: underline;
}
</style>
