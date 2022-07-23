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
                        <option v-if="opcion === 'A'" value="ACR" selected>
                          Alta por cambio de residencia
                        </option>
                        <option v-if="opcion === 'A'" value="AIM">
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
                            v-for="viv in viviendas"
                            :value="viv"
                            :key="viv.id">
                            {{ viv.nombre }}
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
                        <select v-model="numeracion">
                          <option
                            v-for="num in numeracionesCalle"
                            :value="num"
                            :key="num.id">
                            {{ num.numero }}
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
    <div class="column is-one-quarters">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div>
              Archivos necesarios para la solicitud:
              <div v-if="opcion === 'A'" value="ACR">
                <p v-if="subOpcion === 'ACR'">
                  <b> Alta por cambio de residencia </b>
                </p>
                <p v-if="subOpcion === 'AIM'">
                  <b> Alta de inmigrantes </b>
                </p>
              </div>
              <div v-if="opcion === 'B'">
                <b> Las solicitudes de baja no está disponibles </b>
              </div>
              <p v-if="subOpcion === 'MD'">
                <b> Modificación datos personales </b>
              </p>
              <p v-if="subOpcion === 'MV'">
                <b> Cambio de domicilio </b>
              </p>
              <p v-if="subOpcion === 'MRE'">
                <b> Renovación empadronamiento </b>
              </p>
              <ul v-for="documento in documentosNecesarios">
                <li> {{ documento }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="files">
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
              El sistema no le permitirá enviar la solicitud sin presentar los documentos
              mencionados arriba.
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div class="card" v-if="convivientes.length > 0 && subOpcion === 'MV'">
        <div class="card-content">
          <div class="content">
            <div v-for="conviviente in convivientes">
              <div>
                <label>
                  <input type="checkbox" @click="editarSolicitud(conviviente.id)">
                  {{ conviviente.nombre }}, {{ conviviente.primerApellido }}
                  {{ conviviente.segundoApellido }}
                </label>
              </div>
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
import { NumeracionGET } from '@/api/NumeracionGET';
import { HojaGET } from '@/api/HojaGET';
import { CalleGET } from '@/api/CalleGET';
import { TiposCalleGET } from '@/api/TiposCalleGET';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import Cookie from 'js-cookie';
import { ConvivientesGET } from '@/api/ConvivientesGET';

export default {
  name: 'RequestFormComponent',
  props: {
    userLogged: Object,
  },
  async setup(props) {
    const router = useRouter();
    const formData = new FormData();

    const {
      id,
      hoja
    } = props.userLogged.hoja;
    const { convivientes } = await ConvivientesGET(id, hoja, props.userLogged.id);

    const isSubmitted = ref(false);
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

    let documentosNecesarios = ref(['DNI o Libro de Familia', 'Extranjeros deben presentar pasaporte o permiso de residencia']);
    watch(subOpcion, (selectedOption) => {
      if (selectedOption === 'MV' || selectedOption === 'ACR' || selectedOption === 'MRE') {
        documentosNecesarios.value = ['DNI o Libro de Familia', 'Extranjeros deben presentar pasaporte o permiso de residencia'];
      } else if (selectedOption.startsWith('B')) {
        documentosNecesarios.value = ['Opción no disponible'];
      } else if (selectedOption === 'MD') {
        documentosNecesarios.value = ['Documento que acredite el cambio que vas a realizar', 'Si realiza un cambio en su documento de identidad, debe añadir el antiguo'];
      }
    });

    const tipoViviendas = (await TiposCalleGET()).tipos;
    const tipoVivienda = ref('Calle');
    const { calles } = await CalleGET(tipoVivienda.value);
    const viviendas = ref(calles.value);
    const vivienda = ref(viviendas.value[0]);

    watch(tipoVivienda, async (selectedOption) => {
      const { calles } = await CalleGET(selectedOption);
      viviendas.value = calles.value;
      vivienda.value = viviendas.value[0];
    });

    const { numeraciones } = await NumeracionGET(vivienda.value.id);
    const numeracionesCalle = ref(numeraciones.value);
    const numeracion = ref(numeracionesCalle.value[0]);

    watch(vivienda, async (selectedOption) => {
      const { numeraciones } = await NumeracionGET(selectedOption.id);
      numeracionesCalle.value = numeraciones.value;
      numeracion.value = numeracionesCalle.value[0];
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
      let confirma = window.confirm('¿Desea eliminar este documento?');
      if (confirma) {
        const index = archivosName.value.indexOf(file.name);
        const { length } = archivosName.value;
        archivosName.value = archivosName.value
          .slice(0, index)
          .concat(archivosName.value.slice(index + 1, length + 1));
        archivos.value = archivos.value
          .slice(0, index)
          .concat(archivos.value.slice(index + 1, length + 1));
      }
    };

    let convivientesEnSolicitud = [];

    const editarSolicitud = (id) => {
      if (convivientesEnSolicitud.filter((conv) => conv.id === id).length === 0) {
        let conviviente = convivientes.value.filter((conv) => conv.id === id);
        convivientesEnSolicitud.push(conviviente[0]);
      } else {
        convivientesEnSolicitud = convivientesEnSolicitud.filter((conv) => conv.id !== id);
      }
    };
    const submitForm = async () => {
      isSubmitted.value = true;
      const estadoSolicitante = props.userLogged.estado;
      const nacionalidad = props.userLogged.nacionalidad;

      if (nacionalidad === 108 && (subOpcion.value === 'AIM' || subOpcion.value === 'MRN')) {
        await Swal.fire('Oops...', 'Está intentando realizar una solicitud de extranjería (Alta por inmigración o Renovación de empadronamiento) cuando posee nacionalidad española.', 'error');
        isSubmitted.value = false;
        return;
      }

      if (estadoSolicitante === 'A' && opcion.value === 'A') {
        await Swal.fire('Oops...', 'Está intentando realizar una solicitud de Alta cuando su cuenta ya está activa. Debe realizar una modificación en este caso.', 'error');
        isSubmitted.value = false;
        return;
      }

      if (estadoSolicitante === 'M' && opcion.value === 'B') {
        await Swal.fire('Oops...', 'Está intentando realizar una solicitud de Modificación cuando su cuenta no está activa. Debe realizar solicitud de alta en este caso.', 'error');
        isSubmitted.value = false;
        return;
      }

      /* eslint-disable */
      let tipoIdentificacion = 22;
      if (tIdentificacion.value.match('\\d{8}\\w')) {
        tipoIdentificacion = 23;
      } else if (tIdentificacion.value.match('\\d{7}\\w')) {
        tipoIdentificacion = 24;
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

      const { hojas } = await HojaGET(numeracion.value.id);

      const solicitudVivienda = {
        fecha: new Date(),
        solicitante: {
          id: props.userLogged.id
        },
        justificacion: '',
        tipo: opcion.value,
        subtipo: subOpcion.value,
        estado: 'P',
        hoja: {
          id: hojas.value[0].id,
        },
        documentos: [],
        grupo: convivientesEnSolicitud,
      };

      let solicitud;
      let estado;
      let documentos;
      const token = Cookie.get('token');
      if (formData.get('file') !== null && formData.getAll('file').length > 2) {
        await axios.post(`${BASE_URL}solicitud/document/new`, formData, {
          headers: {
            'Content-Type': 'multipart/boundary',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((res) => {
            estado = res.status;
            documentos = res.data;
          })
          .catch(() => {
            isSubmitted.value = false;
            window.alert('Se ha producido un error tratando su solicitud.\n\nPosiblemente, el tamaño del conjunto de documentos es superior al que acepta el sistema.');
          });
      } else {
        isSubmitted.value = false;
        await Swal.fire('Error', '<p>Está enviando una solicitud sin presentar los documentos necesarios para la misma. <br> Puede encontrar los archivos necesarios para esta solicitud en la columna de la derecha.</p>', 'info');
        return;
      }

      if (opcion.value === 'A' || subOpcion.value !== 'MD') {
        solicitud = solicitudVivienda;
      } else {
        solicitud = solicitudDatosPersonales;
      }

      solicitud.documentos = documentos;

      if ((estado === 200 || estado === undefined) && isSubmitted.value !== false) {
        await axios.post(`${BASE_URL}solicitud/habitante/new`, solicitud, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
          .then((res) => {
            if (res.data.status === 200) {
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
      numeracionesCalle,
      numeracion,
      convivientes,
      documentosNecesarios,
      adjuntarArchivo,
      deleteFile,
      submitForm,
      editarSolicitud,
    };
  },
};
</script>

<style>
@media (max-width: 1318px) {
  html, body {
    background: url(../../images/v996-016.jpg) center center;
    background-size: cover;
  }
}
</style>

<style scoped>
* {
  text-align: center;
}

input {
  text-align: left;
}

html, body {
  background: url(../../images/v996-016.jpg) no-repeat center center;
  background-size: cover;
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
