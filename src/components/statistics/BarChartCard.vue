<template>
  <div id="chart">
    <VueApexChart
      type="bar"
      :heigth="heightData"
      :options="chartOptions"
      :series="series"
      ref="areaChart">
    </VueApexChart>
  </div>
</template>

<script>
import VueApexChart from 'vue3-apexcharts';

export default {
  name: 'BarChartCard',
  components: {
    VueApexChart,
  },
  props: ['data', 'columns', 'colors'],
  data() {
    return {
      /* eslint-disable */
      heightData: innerHeight / 2,
      series: [
        {
          data: this.data,
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 250,
        },
        plotOptions: {
          bar: {
            distributed: true
          },
        },
        xaxis: {
          categories: this.columns,
        },
        colors: this.colors,
      },
    };
  },
  methods: {},
};
</script>

<style scoped>

</style>
