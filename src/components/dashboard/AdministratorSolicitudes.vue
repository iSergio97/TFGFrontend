<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Diagrama de barras - Habitantes por direccion</p>
            </div>
            <div class="message-body">
              <AreaChartCard :points="points"/>
            </div>
          </article>
        </div>
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Diagrama de sectores - Solicitudes por estado</p>
            </div>
            <div class="message-body" v-if="isLoaded">
              <Doughnut :solicitudes="solicitudesPorEstado"/>
            </div>
            <div class="message-body" v-else>
              <LoadingDiv/>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VerticalNav from '@/components/statistics/VerticalNav';
import AreaChartCard from '@/components/statistics/AreaChartCard';
import Doughnut from '@/components/statistics/Doughnut';
import Cookie from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import LoadingDiv from '@/components/LoadingDiv';
import { MapaCalorGET } from '@/api/MapaCalorGET';

export default {
  name: 'AdministratorSolicitudes',
  components: {
    LoadingDiv,
    Doughnut,
    AreaChartCard,
    VerticalNav
  },
  data() {
    return {
      isLoaded: false,
      solicitudesPorEstado: {
        aceptadas: 0,
        rechazadas: 0,
        canceladas: 0,
        pendientes: 0,
      },
      ratioSolicitudes: 0.0,
      solicitudesDate: [],
      token: Cookie.get('token'),
      puntos: [],
    };
  },
  methods: {
    async fluctuacion() {
      await axios.get(`${BASE_URL}estadisticas/fluctuacion`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          this.solicitudesPorEstado = res.data.object;
          this.isLoaded = true;
        });
    },
  },
  async mounted() {
    await this.fluctuacion();
  }
};
</script>

<style scoped>
* {
  text-align: center;
}

.main {
  display: block;
  padding: 70px 1em 2em 260px;
  min-height: calc(100vh - 64px);
  transition: 0.2s all ease-out;
  border-left: none;
}
</style>
