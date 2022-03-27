<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <vue-google-heatmap :points="points"
                              :width="700"
                              :height="625"
                              :initial-zoom="15"
                              maxIntensity="1000"
                              :lat="37.5403514"
                              :lng="-5.0845226"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { MapaCalorGET } from '@/api/MapaCalorGET';
import VerticalNav from '@/components/statistics/VerticalNav';

export default {
  name: 'AdministratorHeatmap',
  components: { VerticalNav },
  data() {
    return {
      salto: {
        lat: 37.5451443,
        lng: -5.0819647
      },
      emigrantes: {
        lat: 37.5437427,
        lng: -5.0857654
      },
      ferrocarril: {
        lat: 37.5401121,
        lng: -5.0891474
      },
      points: [],
    };
  },
  methods: {
    async fillPoints() {
      let { mapa } = await MapaCalorGET();
      let salto = [];
      let emigrantes = [];
      let ferrocarril = [];
      mapa.value.forEach((obj) => {
        if (obj.calle.includes('SALTO')) {
          salto = Array(obj.cantidad)
            .fill(this.salto);
          console.log(this.salto);
        } else if (obj.calle.includes('EMIGRANTES')) {
          emigrantes = Array(obj.cantidad)
            .fill(this.emigrantes);
        } else if (obj.calle.includes('FERROCARRIL')) {
          ferrocarril = Array(obj.cantidad)
            .fill(this.ferrocarril);
        }
      });
      this.points = [...salto, ...emigrantes, ...ferrocarril];
    }
  },
  async mounted() {
    await this.fillPoints();
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

.main {
  display: block;
  padding: 70px 1em 2em 260px;
  min-height: calc(100vh - 64px);
  transition: 0.2s all ease-out;
  border-left: none;
}
</style>
