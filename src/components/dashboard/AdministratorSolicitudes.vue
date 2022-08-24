<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Estadísticas de solicitudes</p>
              <div class="is-small">
                Fecha desde: <input type="date" v-model="startTime" name="startTime"/>
                Fecha hasta: <input type="date" v-model="endTime" name="endTime"/>
                <button class="button is-small is-success is-rounded"
                        :class="isLoaded ? '' : 'is-loading'"
                        @click="filtrarEstadisticas">
                  Recargar
                </button>
              </div>
              <select v-model="diagrama">
                <option value="DB" selected>Diagrama de barras</option>
                <option value="D">Donut</option>
              </select>
            </div>
            <div class="message-body" v-if="isLoaded">
              <Doughnut v-if="doughnut"
                        :datos="solicitudesPorEstado"
                        :etiquetas="['Aceptadas', 'Rechazadas', 'Pendientes', 'Canceladas']"
                        :colors="['#48c774', '#f14668', '#ffdd57', '#000000']"/>
              <BarChartCard
                style="width: 80%"
                class="barChard"
                v-if="barChart"
                :data="solicitudesPorEstado"
                :columns="['Aceptadas', 'Rechazadas', 'Pendientes', 'Canceladas']"
                :colors="['#48c774', '#f14668', '#ffdd57', '#000000']"/>
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
import BarChartCard from '../statistics/BarChartCard';
import LineChartCard from '../statistics/LineChartCard';

export default {
  name: 'AdministratorSolicitudes',
  components: {
    LineChartCard,
    BarChartCard,
    LoadingDiv,
    Doughnut,
    AreaChartCard,
    VerticalNav
  },
  data() {
    return {
      isLoaded: false,
      token: Cookie.get('token'),
      solicitudesPorEstado: [],
      diagrama: 'DB',
      text: 'Diagrama de sectores',
      doughnut: false,
      barChart: true,
      startTime: '',
      endTime: '',
    };
  },
  watch: {
    diagrama: {
      handler(newValue, oldValue) {
        this.doughnut = false;
        this.barChart = false;
        switch (newValue) {
          case 'DB':
            this.barChart = true;
            this.text = 'Diagrama de barras';
            break;
          default:
            this.doughnut = true;
            this.text = 'Diagrama de donut';
            break;
        }
      }
    }
  },
  methods: {
    async fluctuacion() {
      await axios.get(`${BASE_URL}estadisticas/fluctuacion`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          let datos = res.data.object;
          this.solicitudesPorEstado = this.tratarRespuestaSolicitud(datos);
          this.isLoaded = true;
        });
    },
    tratarRespuestaSolicitud(datos) {
      let aceptadas = 0;
      let pendientes = 0;
      let rechadazas = 0;
      let canceladas = 0;
      for (let i = 0; i < datos.length; i++) {
        let dato = datos[i];
        let cantidad = dato.cantidad;
        switch (dato.estado) {
          case 'A':
            aceptadas = cantidad;
            break;
          case 'P':
            pendientes = cantidad;
            break;
          case 'R':
            rechadazas = cantidad;
            break;
          case 'C':
            canceladas = cantidad;
            break;
        }
      }
      return [aceptadas, rechadazas, pendientes, canceladas];
    },
    async filtrarEstadisticas() {
      this.isLoaded = false;
      await axios.get(`${BASE_URL}estadisticas/fluctuacion/filter`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          fechaDesde: this.startTime,
          fechaHasta: this.endTime,
        }
      })
        .then((res) => {
          let datos = res.data.object;
          this.solicitudesPorEstado = this.tratarRespuestaSolicitud(datos);
          this.isLoaded = true;
        });
    },
  },
  async mounted() {
    this.endTime = String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1)
      .padStart(2, '0') + '-' + String(new Date().getDate())
      .padStart(2, '0');
    let fechaSemanaAnterior = new Date();
    fechaSemanaAnterior.setDate(fechaSemanaAnterior.getDate() - 7);
    fechaSemanaAnterior = fechaSemanaAnterior.getFullYear() + '-' + String((fechaSemanaAnterior.getMonth() + 1))
      .padStart(2, '0') + '-' + String(fechaSemanaAnterior.getDate())
      .padStart(2, '0');
    this.startTime = fechaSemanaAnterior;
    console.log(this.startTime, this.endTime);
    await this.fluctuacion();
  }
};
</script>

<style scoped>
html, body {
  background: url(../../images/v996-016.jpg) center center;
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

.barChard {
  margin-right: auto;
}
</style>
