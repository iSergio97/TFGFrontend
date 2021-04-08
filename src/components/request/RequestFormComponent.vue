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
                <div class="field">
                  <p class="select">
                    <span class="select">
                      <label>
                        <select v-model="vivienda">
                          <option
                            v-for="viv in viviendas"
                            :value="viv.id"
                            :key="viv.id">
                            {{viv.calle.nombre}} {{viv.numero}}
                          </option>
                        </select>
                      </label>
                    </span>
                  </p>
                </div>
                <p> MV </p>
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
              <input type="button" :onclick="submitForm" value="Enviar">
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
                  <button class="delete" @click="deleteFile(file)"></button>
                </li>
                <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                   class="title is-5">
                  <i class="far fa-file-image"></i> {{file.name}}
                  <button class="delete" @click="deleteFile(file)"></button>
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
import { ViviendasGET } from '@/api/ViviendasGET';
import Swal from 'sweetalert2';

export default {
  name: 'RequestFormComponent',
  props: {
    userLogged: Object,
  },
  async setup(props) {
    const formData = new FormData();
    const opcion = ref('A');
    // ['ACR', 'AIM', 'MD', 'MV', 'MRN']
    const subOpcion = ref('ACR');
    const options = [{
      country: 'canada',
      meta: {
        code: 'ca',
      },
    }];
    watch(opcion, (selectedOption) => {
      if (selectedOption === 'A') {
        subOpcion.value = 'ACR';
      } else if (selectedOption === 'B') {
        subOpcion.value = 'BNI';
      } else {
        subOpcion.value = 'MD';
      }
    });
    const { lista } = await ViviendasGET();
    const viviendas = ref(lista);
    const vivienda = ref(viviendas.value[0].id);
    /* eslint-disable */
    const nombre = ref(props.userLogged.nombre);
    const primerApellido = ref(props.userLogged.primerApellido);
    const segundoApellido = ref(props.userLogged.segundoApellido);
    const fechaNacimiento  = ref(new Date(props.userLogged.fechaNacimiento));
    const tIdentificacion = props.userLogged.identificacion !== null ?
      ref(props.userLogged.identificacion) : ref('');
    /* eslint-enable */
    const archivosName = ref([]);
    const archivos = ref([]);
    const adjuntarArchivo = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      formData.append('file', file, file.name);
      if (!archivosName.value.includes(file.name)) {
        archivosName.value.push(file.name);
        const type = file.name.toString().split('.');
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
      // TODO: Realizar comprobación de tipo de documento en función del patrón de la misma
      let tipoIdentificacion = 16;
      if(tIdentificacion.value.match("\\d{8}\\w")) {
        tipoIdentificacion = 17;
      } else if(tIdentificacion.value.match("\\d{7}\\w")) {
        tipoIdentificacion = 18;
      }
      const solicitudDatosPersonales = {
        fecha: new Date(),
        solicitante: {
          id: props.userLogged.id
        },
        estado: 'P',
        justificacion: '',
        tipo: opcion.value,
        subtipo: subOpcion.value,
        nombre: nombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        fechaNacimiento: fechaNacimiento.value,
        tipoIdentificacion: { id: tipoIdentificacion },
        // identificacion: tIdentificacion,
        documentos: [],
      };

      const solicitudVivienda = {
        fecha: new Date(),
        solicitante: {
          id: props.userLogged.id
        },
        justificacion: '',
        tipo: opcion.value,
        subtipo: subOpcion.value,
        estado: 'P',
        vivienda: {
          id: vivienda.id
        },
        documentos: [],
      };

      let solicitud;

      if (formData.get('file') !== null) {
        await axios.post(`${BASE_URL}solicitud/document`, formData, {
          headers: {
            'Content-Type': 'multipart/boundary',
          },
        })
          .then((res) => {
            if(opcion.value === 'A' || subOpcion.value !== 'MV') {
              for(let i = 0; i < res.data.length; i++) {
                solicitudDatosPersonales.documentos.push({ id: res.data[i].id, });
              }
            } else {
              for(let i = 0; i < res.data.length; i++) {
                solicitudVivienda.documentos.push({ id: res.data[i].id, });
              }
            }
          });
      }

      if(opcion.value === 'A' || subOpcion.value !== 'MV') {
        solicitud = solicitudDatosPersonales;
      } else {
        solicitud = solicitudVivienda;
      }

      const habitante = {
        id: 6,
      };

      // await axios.post(`${BASE_URL}solicitud/prueba`, habitante);

      await axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud);
    };
    return {
      archivos,
      opcion,
      subOpcion,
      viviendas,
      vivienda,
      options,
      adjuntarArchivo,
      deleteFile,
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

#selectInput {
  width: 65%;
}
</style>
