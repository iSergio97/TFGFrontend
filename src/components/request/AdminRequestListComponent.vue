<template>
  <h3> Ordenar</h3>
  <div class="container">
    <label for="startTime">Fecha desde:</label> <input type="date" v-model="startTime"
                                                       id="startTime"/>
    <label for="endTime">Fecha hasta:</label> <input type="date" v-model="endTime" id="endTime"/>
    <label for="estado">Estado:</label>
    <span>
      <select id="estado" v-model="estado" class="is-expanded">
        <option value="P">Pendiente</option>
        <option value="A">Aceptadas</option>
        <option value="R">Rechazadas</option>
        <option value="C">Canceladas</option>
        <option value="T">Todas</option>
      </select>
    </span>
    <label for="orden"> Orden</label>
    <span>
      <select id="orden" v-model="orden" class="is-expanded">
        <option value="ASC">Ascendiente</option>
        <option value="DESC">Descendiente</option>
      </select>
    </span>
    <button class="button is-small is-success is-rounded"
            :class="isLoaded ? '' : 'is-loading'"
            @click="filtrarSolicitudes">
      Recargar
    </button>
  </div>
  <br>
  <div v-if="lista.length > 0">
    <TablaPaginada :lista="lista" :is-Admin="true" :key="isLoaded"/>
  </div>
  <div v-else class="box">
    <h3> Actualmente no existe ninguna solicitud pendiente de revisar, ¡gran trabajo! </h3>
  </div>
  <div>
    <br>
  </div>
</template>

<script>
import { SolicitudesGET } from '@/api/SolicitudesGET';
import { PMHCrypto } from '@/methods/PMHCrypto';
import { ref, watch } from 'vue';
import TablaPaginada from './TablaPaginada';
import { SolicitudesFiltroGET } from '../../api/SolicitudesFiltroGET';

export default {
  name: 'AdminRequestListComponent',
  components: { TablaPaginada },
  async setup() {
    /* eslint-disable */
    const { decrypt } = PMHCrypto();
    const { id } = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
    let lista = ref((await SolicitudesGET({ user: false }, id)).lista);

    let isLoaded = ref(true);

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

    let estado = ref('P');
    let orden = ref('ASC');

    let filtrarSolicitudes = async () => {
      isLoaded.value = false;
      let tmpLista = (await SolicitudesFiltroGET({
        user: false,
      }, id, startTime.value, endTime.value, estado.value)).lista;
      if (orden.value === 'ASC') {
        tmpLista.value = tmpLista.value.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      }
      lista.value = tmpLista.value;
      isLoaded.value = true;
    };

    return {
      lista,
      estado,
      orden,
      isLoaded,
      startTime,
      endTime,
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
}

.box, table {
  background-color: transparent;
}

input, select {
  margin-right: 10px;
}

select {
  margin-left: 5px;
}
</style>
