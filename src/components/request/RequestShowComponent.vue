<template>
  <br>
  <div class="columns is-centered">
    <div class="column">
      <div class="card" v-if="request.subtipo === 'MD'">
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
              <label class="label">Segundo apellido</label>
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
                <label class="label">Tipo</label>
                <div class="control">
                  <input class="input" type="text" v-model="tipo" disabled>
                </div>
              </div>
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input" type="text" v-model="nombre" disabled>
                </div>
              </div>
              <div class="field">
                <label class="label">Numeracion</label>
                <div class="control">
                  <input class="input" type="text" v-model="numeracion" disabled>
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
            <div class="field">
              <div class="control">
                <form @submit="modificarSolicitud">
                  <div class="field" v-if="isAdmin">
                    <label class="label">Estado</label>
                    <div :class="status === 'A' ? 'control select is-rounded is-success'
              : 'control select is-rounded is-danger'">
                      <select v-model="status" :disabled="!isAdmin || statusRequest !== 'P'">
                        <option value="A">Aceptar</option>
                        <option value="R">Rechazar</option>
                      </select>
                    </div>
                  </div>
                  <br>
                  <div class="field">
                    <label class="label">Justificación</label>
                    <textarea class="textarea" :required="status === 'R'"
                              v-model="justificacion"
                              :disabled="!isAdmin || statusRequest !== 'P'"></textarea>
                  </div>
                  <br>
                  <div v-show="isAdmin || statusRequest === 'P'">
                    <button class="button is-info">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="card">
        <div class="card-content">
          <div class="content has-text-left">
            <strong>Solicitante:</strong> {{ solicitante }}
          </div>
          <div class="content has-text-left">
            <strong>Fecha de creación:</strong> {{ fechaCreacion }}
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
                  <i class="far fa-file-pdf"></i> {{ file.name }}
                </li>
                <li v-else-if="file.name.split('.')[1].toUpperCase() === 'PNG' ||
                file.name.split('.')[1].toUpperCase() === 'JPG' ||
                file.name.split('.')[1].toUpperCase() === 'JPGE'"
                    class="title is-5" @click="downloadFile(file)">
                  <i class="far fa-file-image"></i> {{ file.name }}
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
  async setup(props) {
    /* eslint-disable */
    const { decrypt } = new PMHCrypto();
    const idRequest = ref(props.id);
    const router = useRouter();
    if (Number.isNaN(idRequest.value)) {
      router.push('/database-error');
    }
    const userId = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT'))).id;
    let requests = localStorage.getItem('requests');
    let request;
    if (requests === null) {
      const urlUser = `${BASE_URL}solicitud/${idRequest.value}`;
      const urlAdmin = `${BASE_URL}solicitud/administrador/${idRequest.value}`;
      let url = '';
      const isAdmin = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT')) === 'ADMINISTRATOR';
      if (isAdmin) {
        url = urlAdmin;
      } else {
        url = urlUser;
      }
      const token = Cookie.get('token');
      await axios.get(url, {
        params: {
          userId: userId,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          const {
            status,
            object
          } = res.data;
          if (status !== 200) {
            router.push('/database-error');
          }
          request = object;
        });
    } else {
      requests = JSON.parse(requests);
      request = requests.find((req) => {
        return req.id === idRequest.value;
      });
    }
    console.log(request);
    const solicitante = computed(() => `${request.solicitante.nombre}  ${request.solicitante.primerApellido} ${request.solicitante.segundoApellido}`);
    const fecha = request.fecha;
    const fechaCreacion = computed(() => `${new Date(fecha).getDate()}/${new Date(fecha).getMonth()}/${new Date(fecha).getFullYear()}`);
    const archivos = ref(request.documentos);
    const fechaNacimiento = ref(new Date(request.fechaNacimiento).toISOString()
      .split('T')[0]);
    const statusRequest = ref(request.estado);
    const status = ref('A');
    const { hoja } = request;
    const tipo = ref(hoja.numeracion.calle.tipo);
    const nombre = ref(hoja.numeracion.calle.nombre);
    const numeracion = ref(hoja.numeracion.numero);
    const isAdmin = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT')) === 'ADMINISTRATOR';

    let estado;
    let color;
    switch (request.estado) {
      case 'A':
        estado = 'Aceptada';
        color = 'is-success';
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
      const type = file.name.split('.')[1].toUpperCase() === 'PDF' ? 'application/pdf' : 'image/png';
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
      })
        .then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], { type: type }));
          window.open(url);
        });
    };
    const justificacion = ref(request.justificacion);
    const modificarSolicitud = (e) => {
      e.preventDefault();
      const token = Cookie.get('token');
      const params = new URLSearchParams();
      params.append('solicitudId', request.id);
      params.append('estado', status.value);
      params.append('justificacion', justificacion.value);
      axios.post(`${BASE_URL}solicitud/administrador/update`, params, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.data.status === 200) {
            let timerInterval;
            Swal.fire({
              title: 'Solicitud enviada',
              html: 'Se ha actualizado la solicitud. Se le va a redirigir al listado de solicitudes',
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
                localStorage.removeItem('requests');
                router.push('/administrator/requests/list');
              })
              .catch(() => {
                Swal.fire('Oops...', 'Se ha producido un error al editar el estado de la solicitud. \nPosiblemente esta solicitud ya haya sido aceptada o rechazada por otro administrador.\nO el habitante haya decidido cancelarla.', 'error');
              });
          } else {
            Swal.fire('Oops...', 'Se ha producido un error al editar el estado de la solicitud. \nPosiblemente esta solicitud ya haya sido aceptada o rechazada por otro administrador.\nO el habitante haya decidido cancelarla.', 'error');
          }
        })
        .catch(() => {
          Swal.fire('Oops...', 'Se ha producido un error al editar el estado de la solicitud. \nPosiblemente esta solicitud ya haya sido aceptada o rechazada por otro administrador.\nO el habitante haya decidido cancelarla.', 'error');
        });
    };
    return {
      request,
      color,
      downloadFile,
      status,
      statusRequest,
      isAdmin,
      justificacion,
      tipo,
      nombre,
      numeracion,
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
