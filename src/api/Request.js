import { ref } from 'vue';
import axios from 'axios';
// import Cookie from 'js-cookie';

/* eslint-disable */
export const Request = async (props) => {
  const request = ref({});
  const status = ref(0);

  // TODO: Comprobar qué tipo de solicitud es, para redirigirlo a un controlador u otro

  const baseURL = `http://localhost:8080/habitante/solicitud/`;

  // TODO: Revisar esto
  // https://github.com/nuxt-community/axios-module/issues/97
  if(props.tipo === 'A') { // ALTA
    await axios.get(`${baseURL}new?username=${props.username}&password=${props.password}`)
      .then((res) => {
        const { status, object } = res.data;
        request.value = object;
        status.value = status;
      })
      .catch(() => statusUser.value = 404);
  } else if (props.tipo === 'B') { // BAJA
    await axios.get(`${baseURL}new?username=${props.username}&password=${props.password}`)
      .then((res) => {
        const { status, object } = res.data;
        request.value = object;
        status.value = status;
      })
      .catch(() => statusUser.value = 404);
  } else { // MODIFICACIÓN
    await axios.get(`${baseURL}new?username=${props.username}&password=${props.password}`)
      .then((res) => {
        const { status, object } = res.data;
        request.value = object;
        status.value = status;
      })
      .catch(() => status.value = 404);
  }

  if(status.value === 200) {
    // Almacenar solicitud en la lista de solicitudes en el local
  }

  return {
    request,
    status,
  };
};
