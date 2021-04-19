import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';

/* eslint-disable */
export const OperationGET = async (props) => {
  const lista = ref([]);
  const statusOperation = ref(0);
  const request = ref({});

  const token = Cookie.get('token');

  if(props === undefined) {
    await axios.get(`${BASE_URL}operacion/administrador/list`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
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
