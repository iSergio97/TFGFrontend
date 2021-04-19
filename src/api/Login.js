import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const Login = async (props) => {
  const lista = ref({});
  const statusUser = ref(0);
  const statusConvivientes = ref(0);

  const params = new URLSearchParams();
  params.append("username", props.username);
  params.append("password", props.password);

  await axios.post(`${BASE_URL}habitante/login`, params) //?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      lista.value = object;
      statusUser.value = status;
    })
    .catch(() => statusUser.value = 404);

  return {
    lista,
    statusUser,
    statusConvivientes,
  };
};
