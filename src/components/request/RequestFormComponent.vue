<template>
  <form class="form request" @submit.prevent="submitForm">
    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" :onchange="pruebaArchivo">
        <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Choose a file…
        </span>
      </span>
      </label>
      <h3> Nombre del archivo: {{archivo.nombre}}</h3>
    </div>
    <button> Enviar </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
// import Cookie from 'js-cookie';
// import { Request } from '@/api/Request';

export default {
  name: 'RequestFormComponent',
  props: {
    convivientes: Array,
    userLogged: Object,
  },
  setup(props) {
    const archivo = ref({
      nombre: '',
      tamaño: '',
    });
    console.log(props.convivientes);
    console.log(props.userLogged.nombre);
    const pruebaArchivo = (e) => {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      formData.append('name', file.name);
      axios.post(`${BASE_URL}/solicitud/document`, formData, {
        headers: {
          'Content-Type': 'multipart/boundary',
        },
      }).then((res) => { console.log(res); });
      archivo.value.nombre = e.target.files[0].name;
      console.log(e.target.files);
    };
    const submitForm = () => {
      const formData = new FormData();
      console.log(formData);
    };
    return {
      archivo,
      pruebaArchivo,
      submitForm,
    };
  },
};
</script>

<style>
.form {
  text-align: center;
}
input {
  text-align: center;
}
</style>
