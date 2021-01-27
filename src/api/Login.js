import { ref } from 'vue';
import axios from 'axios';
// import Cookie from 'js-cookie';

/* eslint-disable */
export const Login = async (props) => {
  const user = ref({});
  const statusGet = ref(0);

  await axios.get(`http://localhost:8080/habitante/login?username=${props.username}&password=${props.password}`)
    .then((res) => {
      const { status, object } = res.data;
      user.value = object;
      statusGet.value = status;
    })
    .catch(() => statusGet.value = 404);

  return {
    user,
    statusGet,
  };
};
