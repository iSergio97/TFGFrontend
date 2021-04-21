<template>
  <br>
  <div class="columns is-centered">
    <div class="column">
      <div class="card" v-if="request.tipo === 'A' || request.subTipo === 'MD'">
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input class="input" type="text" v-model="request.nombre" disabled>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="field">
              <label class="label">Primer apellido</label>
              <div class="control">
                <input class="input" type="text" v-model="request.primerApellido" disabled>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="field">
              <label class="label">Segundp apellido</label>
              <div class="control">
                <input class="input" type="text" v-model="request.segundoApellido" disabled>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="field">
              <label class="label">Fecha de nacimiento</label>
              <div class="control">
                <input class="input" type="date" v-model="fechaNacimiento" disabled>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="field">
              <label class="label">Identificación</label>
              <div class="control">
                <input class="input" type="text" v-model="request.identificacion" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Nuevo domicilio</label>
                <div class="control">
                  <input class="input" type="text" v-model="domicilio" disabled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="field" v-if="isAdmin">
              <label class="label">Estado</label>
              <div class="control">
                <select v-model="status">
                  <option value="A">Aceptar</option>
                  <option value="R">Rechazar</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Justificación</label>
              <div class="control">
                <textarea class="textarea" type="textarea"
                       :required="status === 'R'" v-model="justificacion"
                          :disabled="!isAdmin"
                ></textarea>
              </div>
              <br>
              <button class="button is-info" v-if="isAdmin" @click="modificarSolicitud">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="card">
        <div class="card-content">
          <div class="content has-text-left">
            <strong>Solicitante:</strong> {{solicitante}}
          </div>
          <div class="content has-text-left">
            <strong>Fecha de creación:</strong> {{fechaCreacion}}
          </div>
          <div class="content is-vcenteredv">
              <div class="content has-text-left">
                <article :class="'message ' + color" style="width: 30%">
                  <div class="message-header is-centered">
                    <p>{{ estado }}</p>
                  </div>
                </article>
              </div>
          </div>
        </div>
      </div>
      <br>
      <div class="card">
        <div class="card-content">
          <div class="content is-centered">
            <strong>Documentos adjuntos:</strong>
            <div v-if="archivos.length > 0">
              <ul v-for="file in archivos" :key="file.name">
                <li v-if="file.name.split('.')[1].toUpperCase() === 'PDF'" class="title is-5"
                    @click="downloadFile(file)">
                  <i class="far fa-file-pdf"></i> {{file.name}}
                </li>
                <li v-else-if="file.name.split('.')[1].toUpperCase() === 'PNG' ||
                file.name.split('.')[1].toUpperCase() === 'JPG' ||
                file.name.split('.')[1].toUpperCase() === 'JPGE'"
                    class="title is-5" @click="downloadFile(file)">
                  <i class="far fa-file-image"></i> {{file.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Swal from 'sweetalert2';

export default {
  name: 'RequestShowComponent',
  props: {
    id: Number,
  },
  setup(props) {
    const idRequest = ref(props.id);
    const router = useRouter();
    if (Number.isNaN(idRequest.value)) {
      router.push('/database-error');
    }
    const requests = JSON.parse(localStorage.getItem('requests'));
    /* eslint-disable */
    const request = requests.find((req) => {
      return req.id === idRequest.value;
    });
    const solicitante = computed(() => `${request.solicitante.nombre}  ${request.solicitante.primerApellido} ${request.solicitante.segundoApellido}`);
    const fecha = request.fecha;
    const fechaCreacion = computed(() => `${new Date(fecha).getDate()}/${new Date(fecha).getMonth()}/${new Date(fecha).getFullYear()}`);
    const archivos = ref(request.documentos);
    const fechaNacimiento = ref(new Date(request.fechaNacimiento).toISOString().split('T')[0]);
    const status = request.estado;
    const domicilio = computed(() => `${request.vivienda.calle.nombre} ${request.vivienda.numero}`);
    const { decrypt } = new PMHCrypto();
    const isAdmin = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT')) === 'ADMINISTRADOR';
    console.log(isAdmin)

    let estado;
    let color;
    switch (request.estado) {
      case 'A':
        estado = 'Aceptada';
        color = 'is-sucess';
        break;
      case 'R':
        estado = 'Rechazada';
        color = 'is-danger';
        break;
      case 'P':
        estado = 'Pendiente';
        color = 'is-warning';
        break;
      case 'C':
        estado = 'Cancelada';
        color = 'is-dark';
        break;
      default:
        estado = 'Estado desconocido';
        break;
    }
    const downloadFile = async (file) => {
      console.log(file);
      const type = file.name.split('.')[1].toUpperCase() === 'PDF' ? 'application/pdf' : 'image/png';
      console.log(type);
      const id = file.id;
      const token = Cookie.get('token');
      await axios({
        url: `${BASE_URL}solicitud/document/${id}`,
        method: 'GET',
        responseType: 'blob',
        params: {
          requestId: request.id
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => {
        const url = URL.createObjectURL(new Blob([res.data], {type: type}));
        window.open(url);
      });
    }
    const justificacion = ref(request.justificacion);
    const modificarSolicitud = () => {
      const token = Cookie.get('token');
      axios.post(`${BASE_URL}solicitud/administrador/update`, {
        solicitudId: request.id,
        estado: status,
        justificacion: justificacion
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if(res.status === 200) {
          let timerInterval;
          Swal.fire({
            title: 'Solicitud enviada',
            html: 'Se ha actualizado la solicitud. Se le va a redirigir al listado de solicitudes',
            timer: 2000,
            icon: 'success',
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then(() => {
            router.push('/admninistrator/requests/list');
          }).catch(() => {

          });
        }
      })
      .catch(() => {
        Swal.fire('Oops...', 'Se ha producido un error al editar el estado de la solicitud. \nPosiblemente esta solicitud ya haya sido aceptada o rechazada por otro administrador.\nO el habitante haya decidido cancelarla.', 'error');
      });
    }
    /* eslint-enable */
    // console.log('request', request);
    return {
      request,
      color,
      downloadFile,
      status,
      isAdmin,
      justificacion,
      domicilio,
      fechaNacimiento,
      archivos,
      solicitante,
      fechaCreacion,
      estado,
      modificarSolicitud,
    };
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

input[type="text"], input[type="date"] {
  width: 35%;
}
textarea {
  width: 60%;
}

ul {
  list-style-type: none;
}
</style>
