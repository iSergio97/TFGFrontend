<template>
  <section class="hero is-fullheight is-default is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <figure class="image is-4by3">
              <img src="../images/ayto.jpg" alt="Ayuntamiento de Écija">
            </figure>
          </div>
          <div class="column is-6 is-offset-1">
            <h1 class="title is-2">
              Padrón Online de Habitantes
            </h1>
            <h2 class="subtitle is-6">
              El Padrón Online de Habitantes (o POH) es una página web <br>
              donde los usuarios de un pueblo/ciudad podrán  revisar sus <br> datos y solicitar una
              modificación de los datos desde su casa, <br>
              sin la necesidad de personarse en el ayuntamiento.
            </h2>
            <br>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script>
import Footer from '@/views/Footer.vue';

export default {
  name: 'Home',
  components: {
    Footer,
  },
};
</script>

<style scoped>
html,
body {
  font-family: 'Open Sans';
}

img {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
