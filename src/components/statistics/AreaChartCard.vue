<template>
  <div id="chart">
    <VueApexChart type="bar" heigth="350" :options="chartOptions" :series="series"></VueApexChart>
  </div>
</template>

<script>
// import VueApexChart from 'vue3-apexcharts';
import VueApexChart from 'vue3-apexcharts';

export default {
  name: 'AreaChartCard',
  components: {
    VueApexChart,
  },
  data() {
    return {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xAxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
