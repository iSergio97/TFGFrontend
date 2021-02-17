<template>
  <div class="card">
    <div class="notification is-danger" v-if="errorTipoBol">
      <button class="delete" onclick="this.parentElement.style.display='none'"></button>
      {{errorTipo[lang]}}
    </div>
    <div class="notification is-danger" v-if="errorSubtipoBol">
      <button class="delete" onclick="this.parentElement.style.display='none'"></button>
      {{errorSubtipo[lang]}}
    </div>
    <div class="card-content">
      <form class="content is-center" @submit.prevent="submitRequest">
        <div v-if="tipos === 'A'">
          <p><i>Debe rellenar todos los campos para dar de alta a un habitante</i></p>
        </div>
        <div v-else-if="tipos === 'B'">
          <p><i>No debe modificar nada, sólo solicitar el tipo de baja</i></p>
        </div>
        <div v-else>
          <p><i>Sólo debe editar los campos que desea modificar. </i></p>
        </div>
        <div class="field">
          <label class="label">Tipo de solicitud</label>
          <div class="control">
            <div class="select">
              <select v-model="tipos" @change="changeSubtipo">
                <option value="A">Alta</option>
                <option value="B">Baja</option>
                <option value="M">Modificacion</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Subtipo de solicitud</label>
          <div class="control">
            <div class="select">
              <select v-model="subtipos">
                  <option value="AN" v-if="tipos === 'A'">Alta por nacimiento</option>
                  <option value="AO" v-if="tipos === 'A'">Alta por omisión</option>
                  <option value="ACD" v-if="tipos === 'A'">
                    Alta por cambio de domicilio (viene)</option>
                  <option value="BCD" v-if="tipos === 'B'">Baja por cambio de domicilio
                    (se marcha)</option>
                  <option value="BD" v-if="tipos === 'B'">Baja por defunción</option>
                  <option value="MD" v-if="tipos === 'M'">Modificación de datos personales</option>
                  <option value="MV" v-if="tipos === 'M'">Modificación de vivienda</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field" v-if="tipos !== 'A'">
          <label class="label">¿Solicita por alguien? Si no, déjelo vacío</label>
          <div class="control">
            <div class="select">
              <select v-model="solicitaPor" @change="changeInputs">
                <option value=""></option>
                <option v-for="conviviente in convivientes" :value="conviviente.id"
                        :key="conviviente.id">
                  {{conviviente.primerApellido}} {{conviviente.segundoApellido}},
                  {{conviviente.nombre}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="tipos === 'A' || subtipos === 'MD'">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" v-model="nombre" id="nombre" maxlength="20">
            </div>
          </div>
          <div class="field">
            <label class="label">Primer apellido</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="primerApellido"
                id="primer-apellidos"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Segundo apellido</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="segundoApellido"
                id="segundo-apellidos"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Nombre de usuario</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="username"
                id="username"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="password"
                id="password"
                maxlength="30">
            </div>
          </div>
        </div>
        <div v-if="tipos === 'A' || subtipos === 'MV'">
          <div class="field">
            <label class="label">Pais</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="pais"
                id="pais"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Provincia</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="provincia"
                id="provincia"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Municipio</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="municipio"
                id="municipio"
                maxlength="30">
            </div>
          </div>
          <div class="field">
            <label class="label">Calle</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="calle"
                id="calle"
                maxlength="50">
            </div>
          </div>
          <div class="field">
            <label class="label">Número</label>
            <div class="control">
              <input
                class="input"
                type="number"
                v-model="numero"
                id="numero"
                min="0"
                max="999">
            </div>
          </div>
        </div>
        <br>
        <div>
          <button
            :class="[submitted ?
                    'button is-medium is-info is-rounded is-loading' :
                    'button is-medium is-info is-rounded']">
            Enviar <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';
import { Request } from '@/api/Request';

export default {
  name: 'RequestFormComponent',
  props: {
    convivientes: Array,
    userLogged: Object,
  },
  setup(props) {
    const tipos = ref('A');
    const subtipos = ref('AN');
    const solicitaPor = ref('');
    const submitted = ref(false);
    const nombre = ref('');
    // eslint-disable-next-line
    const identificacion = ref('');
    // eslint-enable-next-line
    const primerApellido = ref('');
    const segundoApellido = ref('');
    const pais = ref('ESPAÑA');
    const provincia = ref('SEVILLA');
    const municipio = ref('ÉCIJA');

    const calle = ref('');
    const numero = ref(0);

    const username = ref('');
    const password = ref('');

    const errorTipo = ref(['Se ha producido un error a la hora de seleccionar el tipo de solicitud', 'An error ocurred selecting the request main type']);
    const errorTipoBol = ref(false);
    const errorSubtipo = ref(['Se ha producido un error a la hora de seleccionar el subtipo de solicitud', 'An error ocurred selecting the request subtype']);
    const errorSubtipoBol = ref(false);
    const lang = Cookie.get('lang') === undefined ? 0 : Cookie.get('lang');
    const changeInputs = () => {
      if (tipos.value === 'A') {
        nombre.value = '';
        primerApellido.value = '';
        segundoApellido.value = '';
        identificacion.value = '';
        pais.value = 'ESPAÑA';
        provincia.value = 'SEVILLA';
        municipio.value = 'ÉCIJA';
      } else {
        /* eslint-disable */
        if (solicitaPor.value !== '') {
          const solicitado = props.convivientes.find((conv) => conv.id === solicitaPor.value);
          nombre.value = solicitado.nombre;
          primerApellido.value = solicitado.primerApellido;
          segundoApellido.value = solicitado.segundoApellido;
          identificacion.value = solicitado.identificacion;
        } else {
          console.log('Solicita por sí mismo');
          nombre.value = props.userLogged.nombre;
          primerApellido.value = props.userLogged.primerApellido;
          segundoApellido.value = props.userLogged.segundoApellido;
          identificacion.value = props.userLogged.identificacion;
        }
      }
    };
    const changeSubtipo = () => {
      if (tipos.value === 'A') {
        subtipos.value = 'AN';
      } else if (tipos.value === 'B') {
        subtipos.value = 'BCD';
      } else {
        subtipos.value = 'MD';
      }
      changeInputs();
    };
    const submitRequest = async () => {
      // Comprobación tipos es de alta, baja o modificación
      if (['A', 'B', 'M'].indexOf(tipos.value) === -1) {
        errorTipoBol.value = true;
      }
      // Comprobación que el subtipo corresponde con la lista disponible
      if (['AN', 'AO', 'ACD', 'BD', 'BCD', 'MD', 'MV'].indexOf(subtipos.value)) {
        errorSubtipoBol.value = true;
      }
      // Comprobación que el subtipo corresponde a la lista de tipo
      if (errorSubtipo.value.indexOf(tipos.value) === -1) {
        errorSubtipoBol.value = true;
      }

      const userLoggedId = ref(props.userLogged.id);

      const {
        request,
        statusRequest
      } = await Request({
        tipo: tipos.value,
        subtipos: subtipos.value,
        solicitanteId: userLoggedId.value,
        solicitaPorId: solicitaPor,
        identificacion: identificacion.value,
        nombre: nombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        pais: pais.value,
        municipio: municipio.value,
        calle: calle.value,
        numero: numero.value,
        username: username.value,
        password: password.value,

      });
    };
    return {
      tipos,
      subtipos,
      solicitaPor,
      nombre,
      primerApellido,
      segundoApellido,
      pais,
      provincia,
      municipio,
      identificacion,
      calle,
      numero,
      username,
      password,
      submitted,
      errorTipo,
      errorTipoBol,
      errorSubtipo,
      errorSubtipoBol,
      lang,
      changeSubtipo,
      changeInputs,
      submitRequest,
    };
  },
};
</script>

<style scoped>
.card {
  text-align: center;
}

input {
  text-align: center;
}

#nombre {
  width: 35%;
}

#primer-apellidos, #segundo-apellidos {
  width: 40%;
}

#pais, #provincia, #municipio, #calle, #numero, #username, #password {
  width: 20%;
}

.notification {
  width: 50%;
  margin: 0 auto;
}

</style>
