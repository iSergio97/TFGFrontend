import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const LoginAdmin = async (props) => {
  const lista = ref({});
  const statusRes = ref(0);

  const params = new URLSearchParams();
  params.append("username", props.username);
  params.append("password", props.password);

  await axios.post(`${BASE_URL}sistema/administrador/login`, params)
    .then((res) => {
      const { status, object } = res.data;
      lista.value = object;
      statusRes.value = status;
    })
    .catch(() => {
      statusRes.value = 404;
    });

  return {
    lista,
    statusRes,
  };
};
