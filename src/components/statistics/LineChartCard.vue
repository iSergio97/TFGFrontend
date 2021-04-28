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
  props: ['solicitudesDate'],
  components: {
    VueApexChart,
  },
  data() {
    return{
      arrayDates: [],
      arraySol: [],
      series: [{
        name: "Desktops",
        data: [1,2,3,4,5,6,7],
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
          categories: ['E', 'F', 'M', 'A', 'M', 'JN', 'JL', 'A', 'S', 'O', 'N', 'D'],
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
