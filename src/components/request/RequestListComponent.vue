<template>
  <h3> Ordenar</h3>
  <div class="container">
    <div>
      Fecha desde: <input type="date" v-model="startTime" name="startTime"/>
      Fecha hasta: <input type="date" v-model="endTime" name="endTime"/>
      <button class="button is-small is-success is-rounded"
              :class="isLoaded ? '' : 'is-loading'"
              @click="filtrarSolicitudes">
        Recargar
      </button>
    </div>
  </div>
  <br>
  <div v-if="listaSolicitudes.length > 0">
    <TablaPaginada :lista="listaSolicitudes" :is-Admin="false" :key="isLoaded"/>
  </div>
  <div v-else class="box">
    <h3>
      Actualmente no presenta ninguna solicitud o no ha registrado ninguna solicitud entre las
      fechas que ha indicado. Inténtelo de nuevo cambiando las fechas
    </h3>
  </div>
  <br>
  <div class="e-text-center">
    <router-link to="/user/requests/new" class="button is-success is-outlined is-rounded"> Nueva
      solicitud
    </router-link>
  </div>
  <div>
    <br>
  </div>
</template>

<script>
import { SolicitudesGET } from '@/api/SolicitudesGET';
import { SolicitudesFiltroGET } from '@/api/SolicitudesFiltroGET';
import { PMHCrypto } from '@/methods/PMHCrypto';
import { ref } from 'vue';
import TablaPaginada from './TablaPaginada';

export default {
  name: 'RequestListComponent',
  components: { TablaPaginada },
  async setup() {
    /* eslint-disable */
    const { decrypt } = PMHCrypto();
    const { id } = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
    let { lista } = await SolicitudesGET({ user: true }, id);
    let listaSolicitudes = ref(lista.value);

    let startTime = ref(new Date());
    let endTime = ref(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1)
      .padStart(2, '0') + '-' + String(new Date().getDate())
      .padStart(2, '0'));
    let fechaSemanaAnterior = new Date();
    fechaSemanaAnterior.setDate(fechaSemanaAnterior.getDate() - 7);
    fechaSemanaAnterior = fechaSemanaAnterior.getFullYear() + '-' + String((fechaSemanaAnterior.getMonth() + 1))
      .padStart(2, '0') + '-' + String(fechaSemanaAnterior.getDate())
      .padStart(2, '0');
    startTime.value = fechaSemanaAnterior;

    let filtrarSolicitudes = async () => {
      if (new Date(endTime.value) > new Date() || new Date(startTime.value) > new Date() || new Date(startTime.value) > new Date(endTime.value)) {
        if (new Date(endTime.value) > new Date()) {
          alert('La fecha hasta no puede ser posterior al día actual');
          return;
        } else if (new Date(startTime.value) > new Date()) {
          alert('La fecha inicial no puede ser posterior al día actual');
          return;
        } else if (new Date(startTime.value) > new Date(endTime.value)) {
          alert('La fecha desde no puede ser posterior a la fecha hasta');
          return;
        }
      }
      isLoaded.value = false;
      let { lista } = await SolicitudesFiltroGET({
        user: true,
      }, id, startTime.value, endTime.value);
      listaSolicitudes.value = lista.value;
      isLoaded.value = true;
    };

    let isLoaded = ref(true);

    return {
      listaSolicitudes,
      startTime,
      endTime,
      isLoaded,
      filtrarSolicitudes,
    };
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

table {
  margin: 0 auto;
  background-color: transparent;
}

.box {
  background-color: transparent !important;
}

input, select {
  margin-right: 10px;
}

select {
  margin-left: 5px;
}
</style>
