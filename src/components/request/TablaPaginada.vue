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
      <li><a class="pagination-link is-current">{{ indexPag + 1 }}</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="indexPag < paginas - 2">
        <a class="pagination-link" aria-current="page" @click="indexPag += 1">
          {{ indexPag + 2 }}
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
      <th><abbr title="Tipo de la operación (A)lta, (B)aja o (M)odificación"> Tipo</abbr></th>
      <th><abbr title="
        Subtipo de la operación (Alta por cambio de Residencia(ACR), Alta de Inmigrantes (AIM),
        Modificación de vivienda (MV), Modificación de datos personales (MDP)
        o Modificación por Renovación de Empadronamiento (MRE) (exclusivo para extranjeros)">
        Subtipo</abbr></th>
      <th> Estado</th>
      <th v-if="isAdmin"> Habitante</th>
      <th> Fecha</th>
    </tr>
    </thead>
    <tbody v-for="request in itemsPaginados" :key="request.id">
    <tr>
      <td v-if="!isAdmin">
        <router-link :to="{name: 'UserRequestShow', params: {id: request.id}}">
          {{ request.id }}
        </router-link>
      </td>
      <td v-if="isAdmin">
        <router-link :to="{name: 'AdministratorRequestShow', params: {id: request.id}}">
          {{ request.id }}
        </router-link>
      </td>
      <td> {{ request.tipo }}</td>
      <td> {{ request.subtipo }}</td>
      <td> {{ request.estado }}</td>
      <!-- eslint-disable -->
      <td v-if="isAdmin">
        {{ request.solicitante !== null ? request.solicitante.primerApellido : '' }}
        {{
          request.solicitante !== null ? request.solicitante.segundoApellido : ''
        }},
        {{ request.solicitante !== null ? request.solicitante.nombre : '' }}
      </td>
      <td>
        {{
          String(new Date(request.fecha).getDate())
            .padStart(2, '0')
        }}/{{
          String(new Date(request.fecha).getMonth() + 1)
            .padStart(2, '0')
        }}/{{ new Date(request.fecha).getFullYear() }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'TablaPaginada',
  props: ['lista', 'isAdmin'],
  async setup(props) {
    /* eslint-disable */
    let lista = ref(props.lista || []);
    watch(() => props.lista, (nuevaLista, antiguaLista) => {
      console.log('Watch props.lista');
      lista.value = [];
      let listaTmp = [];
      for (let i = 0; i < nuevaLista.length; i++) {
        let requestJS = nuevaLista[i];
        listaTmp.push(requestJS);
      }
      lista.value = listaTmp;
    }, { deep: true });

    let isAdmin = ref(props.isAdmin);
    const indexPag = ref(0);
    const itemsPerList = (indexPag) => {
      return indexPag * 10 + 10;// Se toman 10 elementos por página
    };

    const itemsPag = (indexPag) => {
      return indexPag * 10 + 10;
    };

    const paginas = ref(Math.ceil(lista.value.length / 10)); // Redondeamos operaciones

    const nextPage = () => {
      if (indexPag.value < paginas.value - 1) {
        indexPag.value++;
      }
    };
    const prevPage = () => {
      if (indexPag.value > 0) {
        indexPag.value--;
      }
    };

    let supLimit = itemsPerList(indexPag.value);
    let itemsPaginados = ref(lista.value.slice(indexPag.value * 10, supLimit));
    watch(indexPag, (indexPag) => {
      supLimit = itemsPag(indexPag);
      itemsPaginados.value = lista.value.slice(indexPag * 10, supLimit);
    });

    let filtrarSolicitudes = async () => {
      let { lista } = await SolicitudesFiltroGET({
        user: true,
      }, id, startTime.value, endTime.value);

      let tmp = ref(lista.value);

      lista.value = tmp.value;
    };

    let disabled = 'disabled';

    return {
      lista,
      isAdmin,
      indexPag,
      paginas,
      supLimit,
      itemsPaginados,
      disabled,
      itemsPerList,
      itemsPag,
      nextPage,
      prevPage,
      filtrarSolicitudes,
    };
  }
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
</style>
