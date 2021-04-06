<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a :disabled="indexPag > 0 ? true : ''"
       @click="prevPage"
       class="pagination-previous"
       id="prevbutton">Página anterior</a>
    <a :disabled="indexPag < paginas - 1 ? true : ''"
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
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'PaginacionBoton',
  props: {
    list: Object,
  },
  setup(props) {
    /* eslint-disable */
    const objects = ref(props.list);
    const indexPag = ref(0);
    const itemsPerList = (indexPag) => {
      return indexPag.value * 10 + 10;// Se toman 10 elementos por página
    };
    let supLimit = itemsPerList(indexPag.value);
    const itemsPaginados = ref(objects.value.slice(indexPag.value * 10, supLimit));
    const paginas = ref(Math.ceil(objects.value.length / 10)); // Redondeamos operaciones
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
    watch(indexPag, (indexPag) => {
      supLimit = itemsPaginados(indexPag);
      itemsPaginados.value = objects.value.slice(indexPag * 10, supLimit);
    });
    return {
      itemsPaginados,
      paginas,
      indexPag,
      objects,
      nextPage,
      prevPage,
    }
  }
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
