import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';

/* eslint-disable */
export const LoginAdmin = async (props) => {
  const user = ref({});
  const statusRes = ref(0);

  await axios.get(`${BASE_URL}sistema/administrador/login?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      user.value = object;
      statusRes.value = status;
    })
    .catch(() => {
      statusRes.value = 404;
    });

  return {
    user,
    statusRes,
  };
};
