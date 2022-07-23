<template>
  <div id="chart">
    <VueApexChart
      type="line"
      heigth="350"
      :options="chartOptions"
      :series="series">
    </VueApexChart>
  </div>
</template>

<script>
/* eslint-disable */
import VueApexChart from 'vue3-apexcharts';

export default {
  name: 'LineChartCard',
  props: ['datos', 'etiquetas', 'colors'],
  components: {
    VueApexChart,
  },
  data() {
    return {
      arrayDates: [],
      arraySol: [],
      series: [{
        name: 'Solicitudes',
        data: this.datos,
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Cantidad solicitudes (7 días)',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xAxis: {
          categories: this.categories,
        }
      },
    };
  },
  mounted() {

  },
};
</script>

<style scoped>

</style>
