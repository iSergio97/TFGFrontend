import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';

/* eslint-disable */
export const SolicitudesGET = async (user, userId) => {
  const lista = ref([]);
  const statusSolicitudes = ref(0);
  const request = ref({});

  const token = Cookie.get('token');

  if(user.user) {
    await axios.get(`${BASE_URL}solicitud/habitante/mine`, {
      params: {
        userId,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        const { status, object } = res.data;
        lista.value = object;
        statusSolicitudes.value = status;
      })
      .catch(() => statusSolicitudes.value = 404);
  } else {
    await axios.get(`${BASE_URL}solicitud/administrador/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        const { status, object } = res.data;
        lista.value = object;
        statusSolicitudes.value = status;
      })
      .catch(() => statusSolicitudes.value = 404);
  }

  return {
    lista,
    statusSolicitudes,
    request,
  };
};
