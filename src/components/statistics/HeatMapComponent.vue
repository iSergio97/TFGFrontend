<template>
  <VueGoogleHeatmap :points="points"
                      :width="innerWidth/2"
                      :height="350"
                      :lat="37.545264"
                      :lng="-5.084157"
  />
</template>

<script>
import VueGoogleHeatmap from 'vue-google-heatmap';

export default {
  name: 'HeatMapComponent',
  components: {
    VueGoogleHeatmap,
  },
  data() {
    /* eslint-disable */
    return {
      points:[
        {lat: 37.545264, lng:-5.084157},
        {lat: 37.545264, lng:-5.084157},
        {lat: 37.545264, lng:-5.084157},
        {lat: 37.5437292, lng:-5.0892015},
        {lat: 37.5437292, lng:-5.0892015},
        {lat: 37.5437292, lng:-5.0892015},
        {lat: 37.551694, lng:-5.0887703},
        {lat: 37.551694, lng:-5.0887703},
        {lat: 37.551694, lng:-5.0887703},
      ],
    }
  }
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
