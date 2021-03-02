import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const Login = async (props) => {
  const user = ref({});
  const statusUser = ref(0);
  const convivientes = ref([]);
  const statusConvivientes = ref(0);

  await axios.get(`${BASE_URL}habitante/login?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      user.value = object;
      statusUser.value = status;
    })
    .catch(() => statusUser.value = 404);

  if(statusUser.value === 200 && user.value.vivienda !== null) {
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
