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
// TODO: Nueva gráfica, diagrama de barra de solicitudes por año y del general
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
        labels: ['Aceptadas', 'Rechazadas', 'Pendientes', 'Canceladas'],
        colors: ['#48c774', '#f14668', '#ffdd57', '#000000'],
      },
    };
  },
};
</script>

<style scoped>

</style>
