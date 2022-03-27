<template>
  <div id="chart">
    <VueApexChart
      type="bar"
      :heigth="heightData"
      :options="chartOptions"
      :series="series">
    </VueApexChart>
  </div>
</template>

<script>
import VueApexChart from 'vue3-apexcharts';
import { MapaCalorGET } from '@/api/MapaCalorGET';

export default {
  name: 'AreaChartCard',
  components: {
    VueApexChart,
  },
  data() {
    return {
      /* eslint-disable */
      heightData: innerHeight / 2,
      series: [{
        data: [0, 0, 0],
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xAxis: {
          categories: ['C/ Salto', 'Avda Emigrantes', 'R/ Ferrocarril'],
        },
      },
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
        } else if (obj.calle.includes('EMIGRANTES')) {
          emigrantes = Array(obj.cantidad)
            .fill(this.emigrantes);
        } else if (obj.calle.includes('FERROCARRIL')) {
          ferrocarril = Array(obj.cantidad)
            .fill(this.ferrocarril);
        }
      });
      this.series.data = [...salto, ...emigrantes, ...ferrocarril]; // Corregir esto. Convertir de array de arrays a valores
    }
  },
  async mounted() {
    await this.fillPoints();
  }
};
</script>

<style scoped>

</style>
