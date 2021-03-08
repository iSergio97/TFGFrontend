import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const OperationGET = async (props) => {
  const lista = ref([]);
  const statusOperation = ref(0);
  const request = ref({});

  if(props === undefined) {
    await axios.get(`${BASE_URL}operacion/administrador/list`)
      .then((res) => {
        const { status, object } = res.data;
        lista.value = object;
        statusOperation.value = status;
      })
      .catch(() => statusOperation.value = 404);
  } else {
    // TODO: Buscar por id
  }

  return {
    lista,
    statusOperation,
    request,
  };
};
