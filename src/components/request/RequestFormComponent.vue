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
    const formData = new FormData();
    const archivo = ref({
      nombre: '',
      tamaño: '',
    });
    const pruebaArchivo = (e) => {
      const file = e.target.files[0];
      console.log(e.target.files);
      formData.append('file', file, file.name);
      archivo.value.nombre = e.target.files[0].name;
    };
    const submitForm = async () => {
      /* eslint-disable */
      const solicitud = {
        fecha: new Date(),
        solicitante: {
          id: props.userLogged.id
        },
        justificacion: '',
        tipo: 'A',
        subtipo: 'AO',
        estado: 'P',
        identificacion: '17476938L',
        nombre: 'Habitante 0',
        primerApellido: 'Primer Apellido Hab0',
        segundoApellido: 'Segundo Apellido Hab0',
        viviendaNueva: { id: 10 },
        fechaNacimiento: new Date('1947-07-17 17:26:07'),
        viviendaId: 10,
        pais: 'ESPAÑA',
        provincia: 'SEVILLA',
        municipio: 'ÉCIJA',
        documentos: [],
      };

      await axios.post(`${BASE_URL}solicitud/document`, formData, {
        headers: {
          'Content-Type': 'multipart/boundary',
        },
      })
        .then((res) => {
          console.log(res.data);
          for(let i = 0; i < res.data.length; i++) {
            solicitud.documentos.push({ id: res.data[i].id, });
          }
          // solicitud.documentos.push({ id: res.data.id, });
        });

      await axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud);
      console.log(solicitud.documentos);
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
