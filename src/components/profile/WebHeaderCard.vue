<template>
  <div class="columns">
    <div class="column">
      <div class="card is-horizontal">
        <div class="card-image" style="width: 21%">
          <figure class="image is-square">
            <img :src="image" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div class="media-content">
              <p class="title is-4">{{ nombre }}</p>
              <p class="subtitle is-6">{{ apellidos }}</p>
            </div>
            <div>
              <div class="content">
                <div>
                  <p> <strong> Dirección</strong>: {{address}} </p>
                </div>
                <div>
                  <p><strong>Fecha de nacimiento</strong>: {{ birthDate }}</p>
                </div>
                <div>
                  <p> <strong> Email</strong>: {{ email }} </p>
                </div>
                <div>
                  <p> <strong> Tarjeta de identificación</strong>: {{ tarjetaIdentificacion }}</p>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item has-text-left">
              <h1><i>Tarjeta de datos personales (esto sólo lo ves tú y nadie más)</i></h1>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebHeaderCard',
  props: {
    image: URL,
    nombre: String,
    apellidos: String,
    address: String,
    birthDate: String,
    email: String,
    tarjetaIdentificacion: String,
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
.card.is-fullimage .card-image .card-stacked {
  border-color: transparent;
}
.card.is-fullimage .card-image .card-stacked,
.card.is-fullimage .card-image .card-stacked {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a:hover {
  text-decoration: underline;
}
</style>
