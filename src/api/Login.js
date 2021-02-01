import { ref } from 'vue';
import axios from 'axios';
// import Cookie from 'js-cookie';

/* eslint-disable */
export const Login = async (props) => {
  const user = ref({});
  const statusUser = ref(0);
  const convivientes = ref([]);
  const statusConvivientes = ref(0);


  await axios.get(`http://localhost:8080/habitante/login?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      user.value = object;
      statusUser.value = status;
    })
    .catch(() => statusUser.value = 404);

  // TODO: Consultas los convivientes
  if(statusUser.value === 200) {
    await axios.get(`http://localhost:8080/habitante/convivientes?vivienda=${user.value.vivienda.calle}`)
      .then((res) => {
        const { status, object } = res.data;
        convivientes.value = object;
        statusConvivientes.value = status;
      });
  }

  return {
    user,
    statusUser,
    convivientes,
    statusConvivientes,
  };
};
