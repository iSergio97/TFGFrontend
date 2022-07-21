<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Operaciones de cambio de domicilio</p>
              <div align="right">
                <div class="container">
                  <div class="notification is-dark">
                    <input type="date" v-model="startTime" name="startTime"/>
                    <input type="date" v-model="endTime" name="endTime"/>
                    <button class="button is-small is-success is-light is-rounded"
                            @click="recargarHeatMap()">
                      Recargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="message-body">
              <vue-google-heatmap :points="points"
                                  :width="950"
                                  :height="625"
                                  :initial-zoom="15"
                                  :lat="37.5403514"
                                  :lng="-5.0845226"/>
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

export default {
  name: 'AdministratorHeatmap',
  components: {
    LoadingDiv,
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
      startTime: '',
      endTime: '',
    };
  },
  watch: {
    startTime: function (val, oldVal) {
      let nuevaFecha = new Date(val);
      if (nuevaFecha > new Date()) {
        this.startTime = oldVal;
        alert('La fecha de inicio no puede ser superior a la fecha actual');
        return;
      } else if (nuevaFecha > new Date(this.endTime)) {
        this.startTime = oldVal;
        alert('La fecha de inicio no puede ser anterior a la fecha de fin');
        return;
      }
      this.startTime = val;
    },

    endTime: function (val, oldVal) {
      let nuevaFecha = new Date(val);
      if (nuevaFecha > new Date()) {
        this.endTime = oldVal;
        alert('La fecha de fin no puede ser superior a la fecha actual');
        return;
      } else if (nuevaFecha < new Date(this.startTime)) {
        this.endTime = oldVal;
        alert('La fecha de fin no puede ser superior a la de inicio');
        return;
      }
      this.endTime = val;
    },
  },
  methods: {
    async fillPoints(fechaInicio, fechaFin) {
      let { mapa } = await MapaCalorGET(fechaInicio, fechaFin);
      this.listHeatmap = mapa;
      this.fillDataPoints();
    },
    fillDataPoints() {
      let year = this.listHeatmap;
      year.forEach((coordenadas) => {
        let {
          lat,
          lng
        } = coordenadas;
        this.points.push({
          lat,
          lng
        });
      });
    },
    recargarHeatMap() {
      this.isLoaded = false;
      this.points = []; // Limpiamos el vector para recargar el mapa
      this.fillPoints(this.startTime, this.endTime);
      this.isLoaded = true;
    },
  },
  async mounted() {
    this.endTime = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1)
      .padStart(2, '0') + '-' + String(new Date().getDate())
      .padStart(2, '0');
    let fechaSemanaAnterior = new Date();
    fechaSemanaAnterior.setDate(fechaSemanaAnterior.getDate() - 7);
    this.startTime = fechaSemanaAnterior.getFullYear() + '-' + String((fechaSemanaAnterior.getMonth() + 1))
      .padStart(2, '0') + '-' + String(fechaSemanaAnterior.getDate())
      .padStart(2, '0');
    await this.fillPoints(this.startTime, this.endTime);
  },
};
</script>

<style>
@media (max-width: 1318px) {
  html, body {
    background: url(../../images/v996-016.jpg) center center;
    background-size: cover;
  }
}
</style>

<style scoped>
html, body {
  background: url(../../images/v996-016.jpg) no-repeat center center;
  background-size: cover;
}

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
