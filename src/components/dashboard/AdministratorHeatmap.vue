<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Mapa de calor - Operaciones de cambio de domicilio del año seleccionado</p>
              <div align="right">
                <div class="select is-rounded is-small">
                  <select v-model="listPosition" class="select is-rounded">
                    <option value="0" selected> 2021</option>
                    <option value="1"> 2020</option>
                    <option value="2"> 2019</option>
                  </select>
                </div>
                <button class="button is-small is-success is-light is-rounded"
                        @click="recargarMapaCalor()">
                  Recargar
                </button>
              </div>
            </div>
            <div class="message-body">
              <vue-google-heatmap :points="points"
                                  :width="750"
                                  :height="625"
                                  :initial-zoom="15"
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
      listHeatmap: [],
      points: [],
      listPosition: 0,
      tipo: 'M',
      subtipo: 'MV',
    };
  },
  methods: {
    async fillPoints() {
      let { mapa } = await MapaCalorGET();
      this.listHeatmap = mapa;
      this.fillDataPoints();
    },
    fillDataPoints() {
      let year = this.listHeatmap[this.listPosition];
      year.forEach((operacion) => {
        let {
          lat,
          lng
        } = operacion.hoja.numeracion;
        this.points.push({
          lat,
          lng
        });
      });
    },
    async areaChart() {
      let { mapa } = await MapaCalorGET();
      this.data = [1, 4, 4];
      this.isLoaded = true;
    },
    recargarMapaCalor() {
      this.isLoaded = false;
      this.points = []; // Limpiamos el vector para recargar el mapa
      this.fillDataPoints();
      this.isLoaded = true;
    },
  },
  async mounted() {
    await this.fillPoints();
    await this.areaChart();
  },
};
</script>

<style>
@media (max-width: 1318px) {
  html, body {
    background: url(../../images/v996-016.jpg) no-repeat center center;
    background-size: cover;
  }
}
</style>

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
