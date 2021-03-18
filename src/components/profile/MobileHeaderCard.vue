<template>
  <div class="card" :width="innerWidth">
    <div class="card-content">
      <!-- TODO: En el login, realizar una petición para devovler los convivientes
          de dicha persona y almacenarlos en caché -->
      <p class="title">
        {{nombre}}
      </p>
      <p class="subtitle">
        {{apellidos}}
      </p>
    </div>
    <footer class="card-footer"
            style="width: 50%; display: block; margin-left: auto; margin-right: auto">
      <p class="card-footer-item">
            <span class='header-icon user-profile-image'>
              <img alt='User profile image' :src='image'>
            </span>
      </p>
      <p> <strong> Dirección</strong>: {{address}} </p>
      <p> <strong> Fecha de nacimiento</strong>: {{ birthDate }} </p>
      <p> <strong> Email</strong>: {{ email }} </p>
      <p> <strong> Tarjeta de identificación</strong>: {{ tarjetaIdentificacion }} </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MobileHeaderCard',
  props: {
    image: URL,
    nombre: String,
    apellidos: String,
    address: String,
    birthDate: String,
    email: String,
    tarjetaIdentificacion: String,
  },
  setup() {
    const { innerWidth } = window;
    return {
      innerWidth,
    };
  },
};
</script>

<style scoped>

</style>
