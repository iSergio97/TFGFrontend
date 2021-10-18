<template>
  <scale-loader :loading="loading" :color="color" :width="size" :height="height"></scale-loader>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

export default {
  name: 'LoadingDiv',
  components: {
    ScaleLoader,
  },
  setup() {
    const color = 'rgba(34,193,195,0.8)';
    const size = '5px';
    const height = '60px';

    return {
      color,
      size,
      height,
    };
  },
};
</script>

<style>
</style>
