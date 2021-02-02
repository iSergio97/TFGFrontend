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

  if(statusUser.value === 200) {
    const { calle, numero } = user.value.vivienda;
    const { id } = user.value
    await axios.get(`http://localhost:8080/habitante/convivientes?vivienda=${calle}&numero=${numero}&id=${id}`)
      .then((res) => {
        const { data } = res;
        convivientes.value = data;
      });
  }

  return {
    user,
    statusUser,
    convivientes,
    statusConvivientes,
  };
};
