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
      formData.append('file', file, file.name);
      // formData.append('name', file.name);
      const solicitud = {
        fecha: new Date(),
        solicitante: props.userLogged,
        justificacion: '',
        tipo: 'A',
        subtipo: 'AO',
        estado: 'P',
        identificacion: '17476938L',
        nombre: 'Habitante 0',
        primerApellido: 'Primer Apellido Hab0',
        segundoApellido: 'Segundo Apellido Hab0',
        viviendaNuevaID: 10,
        fechaNacimiento: '1947-07-17 17:26:07',
        viviendaId: 10,
        pais: 'ESPAÑA',
        provincia: 'SEVILLA',
        municipio: 'ÉCIJA',
      };
      console.log(BASE_URL);
      axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud, {
        /* headers: {
          'Content-Type': 'multipart/boundary',
        }, */
      }).then((res) => { console.log(res); });
      archivo.value.nombre = e.target.files[0].name;
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
