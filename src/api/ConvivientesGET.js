import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "@/api/BASE_URL";
import Cookie from "js-cookie";

/* eslint-disable */
export const ConvivientesGET = async (hojaId, hoja, habId) => {
  const convivientes = ref([]);
  const statusConvivientes = ref(0);

  const token = Cookie.get("token");

  await axios
    .get(`${BASE_URL}habitante/convivientes/${hojaId}/${hoja}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        habId: habId
      }
    })
    .then(res => {
      const { status, object } = res.data;
      convivientes.value = object;
      statusConvivientes.value = status;
    })
    .catch(() => (statusConvivientes.value = 404));

  return {
    convivientes,
    statusConvivientes
  };
};
