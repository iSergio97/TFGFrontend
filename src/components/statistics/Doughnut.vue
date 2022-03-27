<template>
  <div id="chart">
    <VueApexChart type="donut"
                  :height="heightData"
                  :options="chartOptions"
                  :series="solicitudes">
    </VueApexChart>
  </div>
</template>

<script>
import VueApexChart from 'vue3-apexcharts';

export default {
  name: 'Doughnut',
  components: {
    VueApexChart,
  },
  props: ['solicitudes'],
  data() {
    return {
      /* eslint-disable */
      requests: [],
      heightData: innerHeight / 2,
      chartOptions: {
        labels: ['Aceptadas', 'Rechazadas', 'Pendientes', 'Rechazadas'],
        colors: ['#48c774', '#f14668', '#ffdd57', '#000000'],
      },
    };
  },
};
</script>

<style scoped>

</style>
