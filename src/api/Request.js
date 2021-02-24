import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const Request = async (props) => {
  const request = ref({});
  const status = ref(0);

  // https://github.com/nuxt-community/axios-module/issues/975
    await axios.post(`${BASE_URL}habitante/solicitud/new`, {
      props
    })
      .then((res) => {
        const { status, object } = res.data;
        request.value = object;
        status.value = status;
      })
      .catch(() => statusUser.value = 404);
  if(status.value === 200) {
    // Almacenar solicitud en la lista de solicitudes en el local
  }

  return {
    request,
    status,
  };
};
