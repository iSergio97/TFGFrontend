<template>
  <div v-if="isMobile">
    <div class="columns">
      <div class="column">
        <article class="message is-success">
          <div class="message-header">
            <p>Solicitudes aceptadas</p>

          </div>
          <div class="message-body">
            {{solicitudesPorEstado.aceptadas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-danger">
          <div class="message-header">
            <p>Solicitudes rechazadas</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.rechazadas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p>Solicitudes canceladas</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.canceladas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-warning">
          <div class="message-header">
            <p>Solicitudes pendientes</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.pendientes}}
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <Doughnut :solicitudes="[solicitudesPorEstado.aceptadas,
         solicitudesPorEstado.rechazadas,
          solicitudesPorEstado.canceladas,
           solicitudesPorEstado.pendientes]"/>
      </div>
      <div class="column">
        <AreaChartCard />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="columns">
      <div class="column">
        <article class="message is-success">
          <div class="message-header">
            <p>Solicitudes aceptadas</p>

          </div>
          <div class="message-body">
            {{solicitudesPorEstado.aceptadas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-danger">
          <div class="message-header">
            <p>Solicitudes rechazadas</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.rechazadas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p>Solicitudes canceladas</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.canceladas}}
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-warning">
          <div class="message-header">
            <p>Solicitudes pendientes</p>
          </div>
          <div class="message-body">
            {{solicitudesPorEstado.pendientes}}
          </div>
        </article>
      </div>
    </div>
    <div class="columns" v-if="isLoaded">
      <div class="column">
        <Doughnut :solicitudes="[solicitudesPorEstado.aceptadas,
         solicitudesPorEstado.rechazadas,
          solicitudesPorEstado.canceladas,
           solicitudesPorEstado.pendientes]"/>
      </div>
      <div class="column">
        <AreaChartCard />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <HeatMapComponent />
      </div>
    </div>
  </div>
</template>

<script>
import AreaChartCard from '@/components/statistics/AreaChartCard.vue';
import Doughnut from '@/components/statistics/Doughnut.vue';
import HeatMapComponent from '@/components/statistics/HeatMapComponent.vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';

export default {
  name: 'Statistics',
  components: {
    AreaChartCard,
    Doughnut,
    HeatMapComponent,
  },
  data() {
    return {
      isMobile: false,
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
    };
  },
  methods: {
    /* eslint-disable */
    fluctuacion() {
      axios.get(`${BASE_URL}estadisticas/fluctuacion`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        let estados = res.data.object;
        this.solicitudesPorEstado = {
          aceptadas: estados[0],
          rechazadas: estados[1],
          pendientes: estados[2],
          canceladas: estados[3],
        };
        this.isLoaded = true;
      });
    },
    solicitudesDateMethod() {
      axios.get(`${BASE_URL}estadisticas/solicitudes-fecha`, { // TOOD: Adaptar por meses
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      }).then((res) => {
        this.solicitudesDate = res.data.object;
        console.log(res.data.object);
      });
    }
  },
  mounted() {
    this.fluctuacion();
    this.solicitudesDateMethod()
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
