<template>
  <div v-if="isMobile" class="columns">
    <div class="column">
      <PieChartCard />
    </div>
    <div class="column">
        <AreaChartCard />
    </div>
    <div class="column">
      <BarChartCard />
    </div>
  </div>
  <div v-else class="columns">
    <div class="column">
      <AreaChartCard />
    </div>
    <div class="column">
      <PieChartCard />
    </div>
    <div class="column">
      <BarChartCard />
    </div>
  </div>
</template>

<script>
import AreaChartCard from '@/components/statistics/AreaChartCard.vue';
import PieChartCard from '@/components/statistics/PieChartCard.vue';
import BarChartCard from '@/components/statistics/BarChartCard.vue';

export default {
  name: 'Statistics',
  components: {
    AreaChartCard,
    PieChartCard,
    BarChartCard,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  methods: {
    esInvocado() {
      console.log(this.isMobile);
    },
  },
  mounted() {
    this.esInvocado();
  },
  // setup() {
  //   console.log('Se accede a statistics');
  //   const isMobile = ref(false);
  //   return {
  //     isMobile,
  //   };
  // },
};
</script>

<style scoped>
</style>
