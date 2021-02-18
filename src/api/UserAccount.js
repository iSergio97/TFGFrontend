import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
// import Cookie from 'js-cookie';

/* eslint-disable */
export const UserAccount = async (props) => {
  const status = ref(0);


  await axios.post(`${BASE_URL}habitante/user-account/edit`, {
    id: props.id,
    newUsername: props.newUsername,
    currentPassword: props.currentPassword,
    newPassword: props.newPassword,
  })
    .then((res) => {
      status.value = res.data.status;
    })
    .catch(() => status.value = 404); // Nombre de usuario ya en uso

  return {
    status,
  };
};
