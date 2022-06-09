<template>
  <div id="chart">
    <VueApexChart type="donut"
                  :height="heightData"
                  :options="chartOptions"
                  :series="datos">
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
  props: ['datos', 'etiquetas', 'colors'],
  data() {
    return {
      /* eslint-disable */
      requests: [],
      heightData: innerHeight / 2,
      chartOptions: {
        labels: this.etiquetas,
        colors: this.colors,
      },
    };
  },
};
</script>

<style scoped>

</style>
