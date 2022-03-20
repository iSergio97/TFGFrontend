<template>
  <div class="wrapper">
    <aside id="main-sidebar" class="aside">
      <nav class="menu active-menu--home">
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <router-link to="system" class="is-active">
              <span class="icon is-small"><i class="fa fa-tachometer"></i></span>
              <span class="menu-text">General</span>
            </router-link>
          </li>
        </ul>
        <ul class="menu-list">
          <li>
            <router-link to="habitantes">
              <span class="icon is-small"><i class="fa-solid fa-address-card"></i></span>
              <span class="menu-text">Habitantes</span>
            </router-link>
          </li>
          <li>
            <router-link class="" to="operaciones">
              <span class="icon is-small"><i class="fa fa-desktop"></i></span>
              <span class="menu-text">Operaciones</span>
            </router-link>
          </li>
          <li>
            <router-link class="" to="solicitudes">
              <span class="icon is-small"><i class="fa-solid fa-address-card"></i></span>
              <span class="menu-text">Solicitudes</span>
            </router-link>
          </li>
          <li>
            <router-link class="" to="heatmap">
              <span class="icon is-small"><i class="fa fa-map"></i></span>
              <span class="menu-text">Mapa de calor</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <vue-google-heatmap :points="points"
                              :width="700"
                              :height="625"
                              :initial-zoom="15"
                              maxIntensity="1000"
                              :lat="37.5403514"
                              :lng="-5.0845226"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { MapaCalorGET } from '@/api/MapaCalorGET';

export default {
  name: 'Heatmap',
  data() {
    return {
      salto: {
        lat: 37.5451443,
        lng: -5.0819647
      },
      emigrantes: {
        lat: 37.5437427,
        lng: -5.0857654
      },
      ferrocarril: {
        lat: 37.5401121,
        lng: -5.0891474
      },
      points: [],
      async fillPoints() {
        let { mapa } = await MapaCalorGET();
        let salto = [];
        let emigrantes = [];
        let ferrocarril = [];
        mapa.value.forEach((obj) => {
          if (obj.calle.includes('SALTO')) {
            salto = Array(obj.cantidad)
              .fill(this.salto);
            console.log(this.salto);
          } else if (obj.calle.includes('EMIGRANTES')) {
            emigrantes = Array(obj.cantidad)
              .fill(this.emigrantes);
          } else if (obj.calle.includes('FERROCARRIL')) {
            ferrocarril = Array(obj.cantidad)
              .fill(this.ferrocarril);
          }
        });
        this.points = [...salto, ...emigrantes, ...ferrocarril];
      }
    };
  },
  async mounted() {
    await this.fillPoints();
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

.aside {
  padding: 2em .5em 0 .5em;
  overflow: hidden;
  transition: 0.2s width ease-out;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 2;
  width: 250px;
  border-left: none;
}

.main {
  display: block;
  padding: 70px 1em 2em 260px;
  min-height: calc(100vh - 64px);
  transition: 0.2s all ease-out;
  border-left: none;
}
</style>
