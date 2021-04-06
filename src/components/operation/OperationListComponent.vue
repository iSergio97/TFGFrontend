<template>
  <div v-if="operaciones.length === 0">
    <PaginacionBoton :list="operaciones" />
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
  </div>
  <div v-else class="box">
    <h3> Actualmente no se ha registrado ninguna operación.
      Si desea registrar una, acuda a la lista de solicitudes para aceptar una.
      <button @click="test">Hello world</button>
    </h3>
  </div>
</template>

<script>
import { ref } from 'vue';
import { OperationGET } from '@/api/OperationGET';
import PaginacionBoton from '@/components/PaginacionBoton.vue';

export default {
  name: 'OperationListComponent',
  components: {
    PaginacionBoton,
  },
  async setup() {
    /* eslint-disable */
    const operaciones = ref(null);
    const { lista } = await OperationGET();
    operaciones.value = await lista.value;

    return {
      operaciones,
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
</style>
