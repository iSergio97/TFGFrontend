<template>
  <section class="hero is-default is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <figure class="image is-4by3">
              <img src="../images/ayto.jpg" alt="Ayuntamiento de Écija"/>
            </figure>
          </div>
          <div class="column is-6 is-offset-1">
            <h1 class="title is-2">Padrón Municipal Online de Habitantes</h1>
            <h2 class="subtitle is-4">
              Tus gestiones en el ayuntamiento, desde tu dispositivo móvil
            </h2>
            <p class="has-text-centered">
              <router-link to="/FAQ" class="button is-medium is-info is-outlined">
                Pregunas frecuentes
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Home',
};
</script>

<style scoped>
html,
body {
  font-family: "Open Sans", "Roboto", "Segoe UI", "GeezaPro", "DejaVu Serif", "sans-serif", "-apple-system", "BlinkMacSystemFont";
  height: 100%;
}

</style>
