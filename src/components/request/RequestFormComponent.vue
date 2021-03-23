<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <form>
              <div class="field">
                <p class="control">
                  <span class="select">
                    <label>
                      <select v-model="opcion" class="is-expanded">
                        <option selected value="A">Alta</option>
                        <option value="B">Baja</option>
                        <option value="M">Modificación</option>
                      </select>
                    </label>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="select">
                  <span class="select">
                    <label>
                      <select v-model="subOpcion">
                        <option v-if="opcion === 'A'" value="ACR">
                          Alta por cambio de residencia
                        </option>
                        <option v-if="opcion === 'A'" value="AIM" selected>
                          Alta de inmigrantes
                        </option>
                        <option v-if="opcion === 'B'" value="BNI" disabled>
                          Las solicitudes de baja no está disponibles
                        </option>
                        <option v-if="opcion === 'M'" value="MD">
                          Modificación datos personales
                        </option>
                        <option v-if="opcion === 'M'" value="MV">
                          Cambio de domicilio
                        </option>
                        <option v-if="opcion === 'M'" value="MRE">
                          Renovación empadronamiento
                        </option>
                      </select>
                    </label>
                  </span>
                </p>
              </div>
              <div v-if="opcion === 'A' || subOpcion === 'MV'">
                <p> Dropdown de viviendas</p>
              </div>
              <div v-else-if="subOpcion === 'MD'">
                <p> Form con datos personales </p>
              </div>
              <div id="file">
                <label>
                  <input class="file-input" type="file" :onchange="adjuntarArchivo">
                  <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-one-quarters" id="files">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div v-if="archivos.length > 0">
              <ul v-for="file in archivos" :key="file.name">
                <li v-if="file.type === 'PDF'" class="title is-5">
                  <i class="far fa-file-pdf"></i> {{file.name}}
                  <button class="delete" @click="deleteArchivo(file)"></button>
                </li>
                <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                   class="title is-5">
                  <i class="far fa-file-image"></i> {{file.name}}
                  <button class="delete" @click="deleteArchivo(file)"></button>
                </li>
              </ul>
            </div>
            <div v-else>
              No existe ningún documento adjunto a la solicitud
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Swal from 'sweetalert2';
// import Cookie from 'js-cookie';

export default {
  name: 'RequestFormComponent',
  props: {
    convivientes: Array,
    userLogged: Object,
  },
  setup(props) {
    const formData = new FormData();
    const opcion = ref('A');
    // ['ACR', 'AIM', 'MD', 'MV', 'MRN']
    const subOpcion = ref('ACR');
    watch(opcion, (selectedOption) => {
      if (selectedOption === 'A') {
        subOpcion.value = 'ACR';
      } else if (selectedOption === 'B') {
        subOpcion.value = 'BNI';
      } else {
        subOpcion.value = 'MD';
      }
    });
    /* eslint-disable */
    const nombre = ref(props.userLogged.nombre);
    const primerApellido = ref(props.userLogged.primerApellido);
    const segundoApellido = ref(props.userLogged.segundoApellido);
    // console.log(props.userLogged);
    const fechaNacimiento  = ref(new Date(props.userLogged.fechaNacimiento));
    const tIdentificacion = props.userLogged.identificacion !== null ?
      ref(props.userLogged.identificacion) : ref('');
    // console.log(tIdentificacion.value);
    /* eslint-enable */
    const archivosName = ref([]);
    const archivos = ref([]);
    const adjuntarArchivo = (e) => {
      e.preventDefault();
      // console.log(archivosName.value);
      // console.log(archivos.value);
      const file = e.target.files[0];
      formData.append('file', file, file.name);
      if (!archivosName.value.includes(file.name)) {
        archivosName.value.push(file.name);
        const type = file.name.toString().split('.');
        // type = type[type.length - 1];
        archivos.value.push({
          name: file.name,
          type: type[type.length - 1].toUpperCase(),
        });
      }
    };
    const deleteFile = (file) => {
      Swal.fire({
        title: '¿Desea eliminar este documento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Sí',
      }).then((result) => {
        if (result.isConfirmed) {
          const index = archivosName.value.indexOf(file.name);
          const { length } = archivosName.value;
          archivosName.value = archivosName.value
            .slice(0, index)
            .concat(archivosName.value.slice(index + 1, length + 1));
          archivos.value = archivos.value
            .slice(0, index)
            .concat(archivos.value.slice(index + 1, length + 1));
          Swal.fire(
            'OK',
            'Se ha eliminado el archivo de forma correcta',
            'success',
          );
        }
      });
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

      if (formData.get('file') !== null) {
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
          });
      }

      await axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud);
    };
    return {
      archivos,
      opcion,
      subOpcion,
      adjuntarArchivo,
      deleteArchivo: deleteFile,
      submitForm,
    };
  },
};
</script>

<style>
* {
  text-align: center;
}

input[type="file"]{
  height:0;
}

input[type="file"]::-webkit-file-upload-button{
  height:0;
}

li {
  list-style-type: none;
}
</style>
