<template>
  <div v-if="lista.length > 0">
    <PaginacionBoton :list="lista" />
    <table class="table">
      <thead>
      <tr>
        <th>
           ID
        </th>
        <th> <abbr title="Tipo de la operación (A)lta, (B)aja o (M)odificación"> Tipo</abbr></th>
        <th> <abbr title="
        Subtipo de la operación (Alta por cambio de Residencia(ACR), Alta de Inmigrantes (AIM),
        Modificación de vivienda (MV), Modificación de datos personales (MDP)
        o Modificación por Renovación de Empadronamiento (MRE) (exclusivo para extranjeros)">
          Subtipo</abbr></th>
        <th> Habitante </th>
        <th> Fecha </th>
      </tr>
      </thead>
      <tbody v-for="request in lista" :key="request.id">
      <tr>
        <th>{{request.id}}</th>
        <td> {{request.tipo}}</td>
        <td> {{request.subtipo}}</td>
        <!-- eslint-disable -->
        <td> {{request.solicitante.primerApellido}} {{request.solicitante.segundoApellido}}, {{request.solicitante.nombre}}</td>
        <td>
          {{new Date(request.fechaOperacion).getDate()}}/{{new Date(request.fechaOperacion).getMonth()}}/{{new Date(request.fechaOperacion).getFullYear()}}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="box">
    <h3> Actualmente no se ha registrado ninguna operación.
      Si desea registrar una, acuda a la lista de solicitudes para aceptar una.
    </h3>
  </div>
</template>

<script>
import { SolicitudesGET } from '@/api/SolicitudesGET';
import { PMHCrypto } from '@/methods/PMHCrypto';
import PaginacionBoton from '@/components/PaginacionBoton.vue';

export default {
  name: 'RequestListComponent',
  components: {
    PaginacionBoton,
  },
  async setup() {
    const { decrypt } = PMHCrypto();
    const { id } = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
    const { lista } = await SolicitudesGET({ user: true }, id);
    console.log(lista.value[0]);
    return {
      lista,
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
