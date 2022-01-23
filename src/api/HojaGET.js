import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "@/api/BASE_URL";
import Cookie from "js-cookie";

/* eslint-disable */
export const HojaGET = async numeracionId => {
  const hojas = ref([]);
  const statusCalles = ref(0);

  const token = Cookie.get("token");

  await axios
    .get(`${BASE_URL}solicitud/habitante/hojas/${numeracionId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data);
      const { status, object } = res.data;
      hojas.value = object;
      statusCalles.value = status;
    })
    .catch(() => (statusCalles.value = 404));

  return {
    hojas,
    statusCalles
  };
};
