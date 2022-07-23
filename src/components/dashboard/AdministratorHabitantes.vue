<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <article class="message is-dark">
            <div class="message-header">
              <p>Habitantes</p>
            </div>
            <div class="message-body" v-if="isLoaded">
              <Doughnut :datos="contador"
                        :etiquetas="['Hombres', 'Mujeres']"
                        :colors="['#48c774', '#ffdd57']"/>
            </div>
            <div class="message-body" v-else>
              <LoadingDiv/>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VerticalNav from '@/components/statistics/VerticalNav';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';
import Doughnut from '@/components/statistics/Doughnut';
// TODO: Donut de sexo de habitantes empadronados
export default {
  name: 'AdministratorHabitantes',
  components: {
    VerticalNav,
    Doughnut,
  },
  data() {
    return {
      contador: [],
      isLoaded: false,
    };
  },
  methods: {
    async fluctuacion() {
      let token = Cookie.get('token');
      await axios.get(`${BASE_URL}estadisticas/countSexoHabitantes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          let h = 0;
          let m = 0;
          if (res.data.object[0].nombre === 'H') {
            h = res.data.object[0].contador;
            m = res.data.object[1].contador;
          } else {
            h = res.data.object[1].contador;
            m = res.data.object[0].contador;
          }
          this.contador = [h, m];
          this.isLoaded = true;
        });
    },
  },
  async mounted() {
    await this.fluctuacion();
  }
};
</script>

<style scoped>
html, body {
  background: url(../../images/v996-016.jpg) center center;
  background-size: cover;
}

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
