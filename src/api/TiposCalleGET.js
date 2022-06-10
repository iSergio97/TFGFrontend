import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "@/api/BASE_URL";
import Cookie from "js-cookie";

/* eslint-disable */
export const TiposCalleGET = async () => {
  const tipos = ref([]);
  const statusTipos = ref(0);

  const token = Cookie.get("token");

  await axios
    .get(`${BASE_URL}solicitud/habitante/calles/tipo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const { data, status } = res;
      tipos.value = data;
      statusTipos.value = status;
    })
    .catch(() => (statusTipos.value = 404));

  return {
    tipos,
    statusTipos
  };
};
