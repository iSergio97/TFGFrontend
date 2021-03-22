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
                      <select v-model="opcion">
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
                        <option v-if="opcion === 'M'" value="MD">Cambio de domicilio</option>
                        <option v-if="opcion === 'M'" value="MV">
                          Modificación datos personales
                        </option>
                        <option v-if="opcion === 'M'" value="MRE">
                          Renovación empadronamiento
                        </option>
                      </select>
                    </label>
                  </span>
                </p>
              </div>
              <div v-if="opcion === 'A'">
                <div v-if="subOpcion === 'ACR'">
                  <p> ACR </p>
                </div>
                <div v-else>
                  <p> AIM</p>
                </div>
              </div>
              <div v-if="opcion === 'B'">
                <div class="box">
                  <p>
                    Se ha dejado esta operación para manos de los ayuntamientos,
                    pues este tipo de operaciones precisan de operaciones con terceros (INE)
                    para poder actualizar los datos
                  </p>
                </div>
              </div>
              <div v-else>
                <div v-if="opcion === 'M'">
                  <div v-if="subOpcion === 'MD'">
                    <p> MD </p>
                  </div>
                  <div v-else-if="subOpcion === 'MV'">
                    <p> MV </p>
                  </div>
                  <div v-else>
                    <p> MRE </p>
                  </div>
                </div>
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
            <p> Stats de requests </p>
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
    console.log(props.userLogged);
    const fechaNacimiento  = ref(new Date(props.userLogged.fechaNacimiento));
    const tIdentificacion = props.userLogged.identificacion !== null ?
      ref(props.userLogged.identificacion) : ref('');
    console.log(tIdentificacion.value);
    /* eslint-enable */
    const archivo = ref({
      nombre: '',
      tamaño: '',
    });
    const pruebaArchivo = (e) => {
      const file = e.target.files[0];
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
      archivo,
      opcion,
      subOpcion,
      pruebaArchivo,
      submitForm,
    };
  },
};
</script>

<style>
* {
  text-align: center;
}
</style>
