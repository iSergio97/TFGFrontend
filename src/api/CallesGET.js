import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const CallesGET = async () => {
  const lista = ref([]);
  const statusCalles = ref(0);
  const request = ref({});

  await axios.get(`${BASE_URL}solicitud/calles/all`)
    .then((res) => {
      const { status, object } = res.data;
      lista.value = object;
      statusCalles.value = status;
    })
    .catch(() => statusCalles.value = 404);

  return {
    lista,
    statusCalles,
    request,
  };
};
