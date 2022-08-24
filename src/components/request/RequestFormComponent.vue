<template>
  <div class="tabs is-toggle is-toggle-rounded is-fullwidth">
    <ul>
      <li :class="position === 0 ? 'is-active' : ''">
        <a class="inactiveLink">
          <span class="icon is-small"><i class="fas fa-info-circle"></i></span>
          <span>Solicitud</span>
        </a>
      </li>
      <li :class="position === 1 ? 'is-active' : ''" v-if="convivientes.length > 0">
        <!-- Revisar las opciones de mover a los habitantes -->
        <a class="inactiveLink">
          <span class="icon is-small"><i class="fas fa-user-check"></i></span>
          <span>Convivientes</span>
        </a>
      </li>
      <li :class="position === 2 ? 'is-active' : ''">
        <a class="inactiveLink">
          <span class="icon is-small"><i class="fas fa-file-upload"></i></span>
          <span>Documentos</span>
        </a>
      </li>
      <li :class="position === 3 ? 'is-active' : ''">
        <a class="inactiveLink">
          <span class="icon is-small"><i class="fas fa-book-open"></i></span>
          <span>Resumen</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="tab-content">
    <div v-if="position === 0" class="column">
      <UserFormComponent :user-logged="userLogged" @next="next"
                         :datos="{opcion, subOpcion, tipoViviendas, tipoVivienda, viviendas, vivienda, calles, numeracion, nombre, primerApellido, segundoApellido, fechaNacimiento, tIdentificacion}"
                         :first-load="firstLoad"
                         @completa-solicitud="completaSolicitud"/>
    </div>
    <div v-if="position === 1" class="column">
      <ConvivientesComponent @next="next" @previous="previous"/>
    </div>
    <div v-if="position === 2" class="column">
      <UserDocumentosComponent @next="next" @previous="previous"
                               :nacionalidad="userLogged.nacionalidad"
                               :documento="documento"
                               :tipo-operacion="subOpcion"
                               @rellena-documentos="rellenaDocumentos"
      />
    </div>
    <div v-if="position === 3" class="column">
      <ResumenComponent @previous="previous" @submit-request="submitRequest"
                        @demo-data="demoData"/>
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
import UserFormComponent from './UserFormComponent';
import UserDocumentosComponent from './UserDocumentosComponent';
import ConvivientesComponent from './ConvivientesComponent';
import ResumenComponent from './ResumenComponent';

export default {
  name: 'RequestFormComponent',
  props: {
    userLogged: Object,
  },
  components: {
    UserFormComponent,
    UserDocumentosComponent,
    ConvivientesComponent,
    ResumenComponent,
  },
  async setup(props) {
    const router = useRouter();

    let position = ref(0);

    let submitRequest = () => {
      alert('Botón de finalizar pulsado');
    };

    let demoData = (data) => {
      alert('Botón pulsado demoData');
    };

    const next = () => {
      if (position.value === 0 && (convivientes.value.length === 0)) {
        position.value++;
      }
      position.value++;
    };

    const previous = () => {
      if (position.value === 2 && (convivientes.value.length === 0)) {
        position.value--;
      }
      position.value--;
    };

    const avisoFinal = () => {
      alert('Botón de finalizar');
    };

    let documentosNecesarios = ref([]);

    const completaSolicitud = (formField) => {
      opcion.value = formField.opcion;
      subOpcion.value = formField.subOpcion;
      tipoViviendas.value = formField.tipoViviendas;
      tipoVivienda.value = formField.tipoVivienda;
      calles.value = formField.calles;
      viviendas.value = formField.viviendas;
      vivienda.value = formField.vivienda;
      numeracion.value = formField.numeracion;
      nombre.value = formField.nombre;
      primerApellido.value = formField.primerApellido;
      segundoApellido.value = formField.segundoApellido;
      fechaNacimiento.value = formField.fechaNacimiento;
      tIdentificacion.value = formField.tIdentificacion;
    };

    const rellenaDocumentos = (formField) => {
      console.log('formField.documentos', formField.documento.documentosNecesarios.value);
      formData = formField.documento.formData;
      archivos = formField.documento.archivos;
      archivosName = formField.documento.archivosName;
      archivosPreview = formField.documento.archivosPreview;
      documentosNecesarios.value = formField.documentos.documentosNecesarios; // Aquí peta. No puede leer los datos de esta línea
    };

    const {
      id,
      hoja
    } = props.userLogged.hoja;
    const { convivientes } = await ConvivientesGET(id, hoja, props.userLogged.id);

    const isSubmitted = ref(false);
    const opcion = ref('A');
    // ['ACR', 'AIM', 'MD', 'MV', 'MRN']
    const subOpcion = ref('ACR');

    watch(subOpcion, (selectedOption) => {
      switch (selectedOption) {
        case 'ACR':
        case 'AIM':
        case 'MV':
        case 'MRE':
          let dni = {
            alias: 'DNI',
            name: 'DNI o Libro de Familia',
            required: true,
            done: false,
            fileName: '',
          };
          let pasaporte = {
            alias: 'Pasaporte',
            name: 'Extranjeros deben presentar pasaporte o permiso de residencia',
            required: props.nacionalidad !== 108,
            done: false,
            fileName: '',
          };
          documentosNecesarios.value = [];
          documentosNecesarios.value.push(dni);
          documentosNecesarios.value.push(pasaporte);
          break;
        case 'MD':
          let documento = {
            alias: 'Documento',
            name: 'Documento que acredite el cambio que vas a realizar',
            required: true,
            done: false,
            fileName: '',
          };
          let dniAntiguo = {
            alias: 'DocumentoAntiguo',
            name: 'Si realiza un cambio en su documento de identidad, debe añadir el antiguo',
            required: false,
            done: false,
            fileName: '',
          };
          documentosNecesarios.value = [];
          documentosNecesarios.value.push(documento);
          documentosNecesarios.value.push(dniAntiguo);
          break;
        case 'MRN':
          break;
      }
    });

    let firstLoad = true;

    let formData = new FormData();

    let archivosName = ref([]);
    let archivosPreview = ref([]);
    let archivos = ref([]);

    let documento = {
      'formData': formData,
      'archivosName': archivosName,
      'archivosPreview': archivosPreview,
      'archivos': archivos,
      'documentosNecesarios': documentosNecesarios,
    };

    const tipoViviendas = (await TiposCalleGET()).tipos;
    const tipoVivienda = ref('Calle');
    const { calles } = await CalleGET(tipoVivienda.value);
    const viviendas = ref(calles.value);
    const vivienda = ref(viviendas.value[0]);

    const { numeraciones } = await NumeracionGET(vivienda.value.id);
    const numeracionesCalle = ref(numeraciones.value);
    const numeracion = ref(numeracionesCalle.value[0]);

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
      calles,
      numeracionesCalle,
      numeracion,
      convivientes,
      documentosNecesarios,
      position,
      documento,
      next,
      previous,
      completaSolicitud,
      avisoFinal,
      submitRequest,
      demoData,
      formData,
      submitForm,
      firstLoad,
      rellenaDocumentos,
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

.inactiveLink {
  pointer-events: none;
  cursor: default;
}
</style>
