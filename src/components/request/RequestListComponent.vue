<template>
  <div v-if="lista.length > 0">
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
        <a class="pagination-link" aria-current="page" @click="indexPag += 1">
          {{ indexPag  + 2}}
        </a>
      </li>
      <li><a class="pagination-link" @click="indexPag = paginas - 1">Página {{ paginas }}</a></li>
    </ul>
    </nav>
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
        <th> Estado </th>
        <th> Habitante </th>
        <th> Fecha </th>
      </tr>
      </thead>
      <tbody v-for="request in itemsPaginados" :key="request.id">
      <tr>
        <th>
          <router-link :to="{name: 'UserRequestShow', params: {id: request.id}}">
            {{request.id}}
          </router-link>
        </th>
        <td> {{request.tipo}}</td>
        <td> {{request.subtipo}}</td>
        <td> {{request.estado}}</td>
        <!-- eslint-disable -->
        <td> {{request.solicitante.primerApellido}} {{request.solicitante.segundoApellido}}, {{request.solicitante.nombre}}</td>
        <td>
          {{new Date(request.fecha).getDate()}}/{{new Date(request.fecha).getMonth()}}/{{new Date(request.fecha).getFullYear()}}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="box">
    <h3> Actualmente no se ha registrado ninguna operación.
      Si desea registrar una, acuda a la lista de solicitudes para aceptar una.
    </h3>
  </div>
  <br>
  <div class="e-text-center">
    <router-link to="/user/requests/new" class="button is-success is-outlined is-rounded"> Nueva solicitud </router-link>
  </div>
  <div>
    <br>
  </div>
</template>

<script>
import { SolicitudesGET } from '@/api/SolicitudesGET';
import { PMHCrypto } from '@/methods/PMHCrypto';
import { ref, watch } from 'vue';

export default {
  name: 'RequestListComponent',
  async setup() {
    /* eslint-disable */
    const { decrypt } = PMHCrypto();
    const { id } = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
    let lista;
    if(localStorage.getItem('requests') === null) {
      lista = ref((await SolicitudesGET({ user: true }, id)).lista);
      localStorage.setItem('requests', JSON.stringify(lista.value));
    } else {
      lista = ref(JSON.parse(localStorage.getItem('requests')));
    }

    const indexPag = ref(0);
    const itemsPerList = (indexPag) => {
      return indexPag * 10 + 10;// Se toman 10 elementos por página
    };

    const itemsPag = (indexPag) => {
      return indexPag * 10 + 10;
    }

    const paginas = ref(Math.ceil(lista.value.length / 10)); // Redondeamos operaciones
    const nextPage = () => {
      if(indexPag.value < paginas.value - 1) {
        indexPag.value++;
      }
    };
    const prevPage = () => {
      if (indexPag.value > 0) {
        indexPag.value--;
      }
    };
    let supLimit = itemsPerList(indexPag.value);
    const itemsPaginados = ref(lista.value.slice(indexPag.value * 10, supLimit));
    watch(indexPag, (indexPag) => {
      supLimit = itemsPag(indexPag);
      itemsPaginados.value = lista.value.slice(indexPag * 10, supLimit);
    });
    return {
      lista,
      itemsPaginados,
      itemsPag,
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
</style>
