<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Mapa de calor</p>
            </div>
            <div class="message-body">
              <vue-google-heatmap :points="points"
                                  :width="750"
                                  :height="625"
                                  :initial-zoom="15"
                                  maxIntensity="1000"
                                  :lat="37.5403514"
                                  :lng="-5.0845226"/>
            </div>
          </article>
        </div>
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Diagrama de barras - Habitantes por direccion</p>
            </div>
            <div class="message-body" v-if="isLoaded">
              <AreaChartCard :data="data"
                             :columns="['C/ Salto', 'Avda Emigrantes', 'R/ Ferrocarril']"
                             :colors:="['#2E294E', '#8D5B4C', '#F86624']"/>
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
import { MapaCalorGET } from '@/api/MapaCalorGET';
import VerticalNav from '@/components/statistics/VerticalNav';
import LoadingDiv from '@/components/LoadingDiv';
import Doughnut from '@/components/statistics/Doughnut';
import AreaChartCard from '@/components/statistics/AreaChartCard';

export default {
  name: 'AdministratorHeatmap',
  components: {
    LoadingDiv,
    Doughnut,
    AreaChartCard,
    VerticalNav
  },
  data() {
    return {
      isLoaded: false,
      data: [],
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
    };
  },
  methods: {
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
    },
    async areaChart() {
      let { mapa } = await MapaCalorGET();
      let salto = [];
      let emigrantes = [];
      let ferrocarril = [];
      mapa.value.forEach((obj) => {
        if (obj.calle.includes('SALTO')) {
          salto = obj.cantidad;
        } else if (obj.calle.includes('EMIGRANTES')) {
          emigrantes = obj.cantidad;
        } else if (obj.calle.includes('FERROCARRIL')) {
          ferrocarril = obj.cantidad;
        }
      });
      this.data = [salto, emigrantes, ferrocarril];
      this.isLoaded = true;
    }
  },
  async mounted() {
    await this.fillPoints();
    await this.areaChart();
  },
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
