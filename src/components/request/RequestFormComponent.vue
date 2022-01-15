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
                        <option value="A">Alta</option>
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
                        <select v-model="tipoVivienda">
                          <option
                            v-for="(tViv, order) in tipoViviendas"
                            :value="tViv"
                            :key="order">
                            {{ tViv }}
                          </option>
                        </select>
                      </label>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="select">
                    <span class="select">
                      <label>
                        <select v-model="vivienda">
                          <option
                            v-for="viviendas in tipoViviendas"
                            :value="viviendas"
                            :key="viviendas.id">
                            {{ viviendas }}
                          </option>
                        </select>
                      </label>
                    </span>
                  </p>
                </div>
              </div>
              <div v-else-if="subOpcion === 'MD'">
                <div class="is-centered">
                  <div class="field">
                    <label class="label">Nombre</label>
                    <div class="control">
                      <input class="input" type="text" v-model="nombre">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Primer apellido</label>
                    <div class="control">
                      <input class="input" type="text" v-model="primerApellido">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Segundo apellido</label>
                    <div class="control">
                      <input class="input" type="text" v-model="segundoApellido">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Fecha de nacimiento</label>
                    <div class="control">
                      <input class="input" type="date" v-model="fechaNacimiento">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Identificación</label>
                    <div class="control">
                      <input class="input" type="text" v-model="tIdentificacion">
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <div id="file">
                <label>
                  <input class="file-input" type="file" :onchange="adjuntarArchivo">
                  <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Adjuntar documento
                </span>
              </span>
                </label>
              </div>
              <br>
              <div class="e-text-center">
                <button type="button" :class="isSubmitted ? 'is-loading' : ''"
                        :onclick="submitForm" value="Enviar"
                        class="button is-info is-outlined is-rounded">Enviar
                </button>
                <br>
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
                  <i class="far fa-file-pdf"></i> {{ file.name }}
                  <button class="delete" @click="deleteFile(file)"></button>
                </li>
                <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                    class="title is-5">
                  <i class="far fa-file-image"></i> {{ file.name }}
                  <button class="delete" @click="deleteFile(file)"></button>
                </li>
              </ul>
            </div>
            <div v-else>
              Actualmente, la solicitud no presenta ningún documento asociado.
              Si lo envía así, el sistema se lo marcará como rechazada de forma automática.
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
import { NumeracionGET, ViviendasGET } from '@/api/NumeracionGET';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import Cookie from 'js-cookie';

export default {
  name: 'RequestFormComponent',
  props: {
    userLogged: Object,
  },
  async setup(props) {
    const router = useRouter();
    const formData = new FormData();
    const isSubmitted = ref(false);
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

    const { lista } = await NumeracionGET();
    const tipoVivienda = ref('Calle');
    const tipoViviendas = ref(['Calle', 'Ronda', 'Avenida', 'Distrito']);
    const viviendas = ref(lista);
    const vivienda = ref('');
    console.log(viviendas.value);
    watch(tipoVivienda, (selectedOption) => {
      console.log(selectedOption);
    });
    // viviendas.value[0].id
    /* eslint-disable */
    const nombre = ref(props.userLogged.nombre);
    const primerApellido = ref(props.userLogged.primerApellido);
    const segundoApellido = ref(props.userLogged.segundoApellido);
    const fechaNacimiento = ref(new Date(props.userLogged.fechaNacimiento).toISOString()
      .split('T')[0]);
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
        const type = file.name.toString()
          .split('.');
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
      })
        .then((result) => {
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
      isSubmitted.value = true;
      let tipoIdentificacion = 16;
      if (tIdentificacion.value.match('\\d{8}\\w')) {
        tipoIdentificacion = 17;
      } else if (tIdentificacion.value.match('\\d{7}\\w')) {
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
        identificacion: tIdentificacion.value,
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
          id: vivienda.value,
        },
        documentos: [],
      };

      let solicitud;
      let estado;
      const token = Cookie.get('token');
      if (formData.get('file') !== null) {
        await axios.post(`${BASE_URL}solicitud/document/new`, formData, {
          headers: {
            'Content-Type': 'multipart/boundary',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((res) => {
            estado = res.status;
            if (opcion.value === 'A' || subOpcion.value !== 'MV') {
              solicitudDatosPersonales.documentos = res.data;
              /* for(let i = 0; i < res.data.length; i++) {
                solicitudDatosPersonales.documentos.push(res.data[i]);
              } */
              solicitudDatosPersonales.documentos = res.data;
            } else {
              /* for(let i = 0; i < res.data.length; i++) {
                solicitudVivienda.documentos.push(res.data[i]);
              } */
              solicitudVivienda.documentos = res.data;
            }
          })
          .catch(() => {
            isSubmitted.value = false;
            Swal.fire('Oops...', 'Se ha producido un error tratando su solicitud.\nPosiblemente, el tamaño del conjunto de documentos es superior al que acepta el sistema.', 'error');
          });
      }

      if (opcion.value === 'A' || subOpcion.value !== 'MD') {
        solicitud = solicitudVivienda;
      } else {
        solicitud = solicitudDatosPersonales;
      }

      console.log('solicitud', solicitud);

      if (estado === 200 || estado === undefined) {
        await axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
          .then((res) => {
            if (res.data.status === 200) {
              // Añadimos la request a la lista de requests
              const { object } = res.data;
              const arrayRequests = JSON.parse(localStorage.getItem('requests'));
              arrayRequests.push(object);
              localStorage.setItem('requests', JSON.stringify(arrayRequests));
              let timerInterval;
              Swal.fire({
                title: 'Solicitud enviada',
                html: 'Se ha enviado su solicitud. Se le va a redirigir al listado de solicitudes',
                timer: 2000,
                icon: 'success',
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  timerInterval = setInterval(() => {
                    const content = Swal.getContent();
                    if (content) {
                      const b = content.querySelector('b');
                      if (b) {
                        b.textContent = Swal.getTimerLeft();
                      }
                    }
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              })
                .then(() => {
                  router.push('/user/requests/list');
                })
                .catch(() => {

                });
              formData.delete('file');
            } else {
              isSubmitted.value = false;
              Swal.fire('Oops...', 'Se ha producido un error inesperado tratando su solicitud. Inténtelo de nuevo más tarde.', 'error');
            }
          });
      }
    };
    return {
      isSubmitted,
      nombre,
      primerApellido,
      segundoApellido,
      tIdentificacion,
      fechaNacimiento,
      archivos,
      tipoVivienda,
      tipoViviendas,
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

<style scoped>
* {
  text-align: center;
}

input[type="file"] {
  height: 0;
}

input[type="file"]::-webkit-file-upload-button {
  height: 0;
}

li {
  list-style-type: none;
}

input[type="text"], input[type="date"] {
  width: 35%;
}

.card, input, select {
  background-color: transparent;
}

input, select {
  border: solid 1px black;
}
</style>
