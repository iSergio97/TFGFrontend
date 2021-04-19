import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';

/* eslint-disable */
export const ViviendasGET = async () => {
  const lista = ref([]);
  const statusCalles = ref(0);

  const token = Cookie.get('token');

  await axios.get(`${BASE_URL}solicitud/viviendas/all`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  },)
    .then((res) => {
      const { status, object } = res.data;
      lista.value = object;
      statusCalles.value = status;
    })
    .catch(() => statusCalles.value = 404);

  return {
    lista,
    statusCalles,
  };
};
