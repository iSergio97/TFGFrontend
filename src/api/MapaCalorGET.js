import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "@/api/BASE_URL";
import Cookie from "js-cookie";

/* eslint-disable */
export const MapaCalorGET = async (start, end) => {
  const mapa = ref([]);
  const statusMapa = ref(0);

  const token = Cookie.get("token");

  await axios
    .get(`${BASE_URL}sistema/operacion/heatmap`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        start,
        end,
      },
    })
    .then((res) => {
      const { status, object } = res.data;
      mapa.value = object;
      statusMapa.value = status;
    })
    .catch(() => (statusMapa.value = 404));

  return {
    mapa,
    statusMapa,
  };
};
