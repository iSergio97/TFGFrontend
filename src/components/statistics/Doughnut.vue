<template>
  <div id="chart">
    <VueApexChart type="donut"
                  :height="heightData"
                  :options="chartOptions"
                  :series="datos"
                  ref="areaChart">
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
  props: ['datos', 'etiquetas', 'colors'],
  data() {
    return {
      /* eslint-disable */
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
