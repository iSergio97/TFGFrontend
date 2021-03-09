<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a :disabled="indexPag > 0 ? disabled : ''"
       @click="prevPage"
       class="pagination-previous"
       id="prevbutton">Página anterior</a>
    <a :disabled="indexPag < paginas - 1 ? disabled : ''"
       @click="nextPage"
       class="pagination-next"
       id="nextButton">Siguiente página</a>
    <ul class="pagination-list">
      <li><a class="pagination-link" @click="indexPag = 0">Página 1</a></li>
      <li v-if="indexPag > 0">
        <a class="pagination-link" @click="indexPag -= 1">{{ indexPag }}
        </a>
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link is-current" >{{ indexPag + 1 }}</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="indexPag < paginas - 2">
        <a class="pagination-link" aria-current="page" @click="indexPag += 1">{{ indexPag  + 2}}</a>
      </li>
      <li><a class="pagination-link" @click="indexPag = paginas - 1">Página {{ paginas }}</a></li>
    </ul>
  </nav>
  <table class="table">
    <thead>
    <tr>
      <th>
        <abbr title="ID de la operación"> ID </abbr>
      </th>
      <th> <abbr title="Tipo de la operación (A)lta, (B)aja o (M)odificación"> Tipo</abbr></th>
      <th> Habitante </th>
      <th> Fecha </th>
      <th> Solicitud relacionada </th>
    </tr>
    </thead>
    <tbody v-for="operation in operacionesPaginadas" :key="operation.id">
    <tr>
      <th>{{operation.id}}</th>
      <td> {{operation.tipo}}</td>
      <!-- eslint-disable -->
      <td> {{operation.habitante.primerApellido}} {{operation.habitante.segundoApellido}}, {{operation.habitante.nombre}}</td>
      <td>
        {{new Date(operation.fechaOperacion).getDate()}}/{{new Date(operation.fechaOperacion).getMonth()}}/{{new Date(operation.fechaOperacion).getFullYear()}}</td>
      <!-- eslint-enable -->
      <td>
        <a :href="'/administrator/requests/show/' + operation.solicitud.id">
          + info
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, watch } from 'vue';
import { OperationGET } from '@/api/OperationGET';

export default {
  name: 'OperationListComponent',
  async setup() {
    /* eslint-disable */
    const operaciones = ref(null);
    const { lista } = await OperationGET();
    setTimeout(function(){}, 30000);
    operaciones.value = await lista.value;
    const indexPag = ref(0);
    const operacionesPag = (indexPag) => {
      return indexPag * 10 + 10;// Se toman 10 elementos por página
    };
    let supLimit = operacionesPag(indexPag.value);
    const operacionesPaginadas = ref(operaciones.value.slice(indexPag.value * 10, supLimit));
    const paginas = ref(Math.ceil(operaciones.value.length / 10)); // Redondeamos operaciones
    const nextPage = () => {
      if(indexPag.value < paginas.value - 1) {
        indexPag.value++;
      }
    };
    const prevPage = () => {
      if(indexPag.value > 0) {
        indexPag.value--;
      }
    };
    // watchEffect((operacionesPaginadas) => {indexPag});
    watch(indexPag, (indexPag) => {
      supLimit = operacionesPag(indexPag);
      console.log(supLimit);
      console.log(indexPag*10);
      operacionesPaginadas.value = operaciones.value.slice(indexPag * 10, supLimit);
      console.log(operacionesPaginadas.value);
    });

    return {
      operaciones,
      operacionesPaginadas,
      paginas,
      indexPag,
      nextPage,
      prevPage,
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

#nextButton {

}

</style>
