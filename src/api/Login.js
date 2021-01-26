import { ref } from 'vue';
import axios from 'axios';
// import Cookie from 'js-cookie';

/* eslint-disable */
export const User = async (props) => {
  const user = ref({});
  const statusGet = ref(0);
  // Cuiraro, watch es sólo para peticiones constantes, para ver si cambia algún valro o no.
  // En el caso del login, no se necesario poner watch porque si no, como no cambia nada, no devuelve nada.
  await axios.get(`http://localhost:8080/habitante/login?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      console.log(res.data);
      user.value = object;
      statusGet.value = status;
    });

  return {
    user,
    statusGet,
  };
};
