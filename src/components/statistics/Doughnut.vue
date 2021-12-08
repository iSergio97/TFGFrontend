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
      heightData: innerHeight / 2,
      chartOptions: {
        labels: ['Aceptadas', 'Rechazadas', 'Canceladas', 'Pendientes'],
        colors: ['#48c774', '#f14668', '#000000', '#ffdd57'],
      },
    };
  },
};
</script>

<style scoped>

</style>
