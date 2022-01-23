import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "@/api/BASE_URL";
import Cookie from "js-cookie";

/* eslint-disable */
export const CalleGET = async calleTipo => {
  const calles = ref([]);
  const statusCalles = ref(0);

  const token = Cookie.get("token");

  await axios
    .get(`${BASE_URL}solicitud/habitante/calles/${calleTipo}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const { status, object } = res.data;
      calles.value = object;
      statusCalles.value = status;
    })
    .catch(() => (statusCalles.value = 404));

  return {
    calles,
    statusCalles
  };
};
