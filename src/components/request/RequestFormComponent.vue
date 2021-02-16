<template>
  <div class="card">
    <div class="card-content">
      <form class="content is-center" @submit.prevent="submitRequest">
        <p><i>Si sólo desea una modificación, puede dejar campos vacíos.
        <br>Sólo debe rellenar los campos que desea modificar</i></p>
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
                  <option value="BCD" v-if="tipos === 'B'">Baja por cambio de domicilio</option>
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
          <label class="label">Segundo apellido</label>
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
          <label class="label">Segundo apellido</label>
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
          <label class="label">Segundo apellido</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="municipio"
              id="municipio"
              maxlength="30">
          </div>
        </div>

        <button
          :class="[submitted ?
                    'button is-medium is-info is-rounded is-loading' :
                    'button is-medium is-info is-rounded']">
          Enviar <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

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
    // props.userLogged.identificacion === null ? ref("") : ref(props.userLogged.identificacion);
    // eslint-enable-next-line
    const primerApellido = ref('');
    const segundoApellido = ref('');
    const pais = ref('ESPAÑA');
    const provincia = ref('PROVINCIA');
    const municipio = ref('MUNICIPIO');
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
    const submitRequest = () => {
      console.log(tipos.value);
      console.log(subtipos.value);
      console.log(solicitaPor.value);
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
      submitted,
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
  width: 60%;
}

#pais, #provincia, #municipio {
  width: 20%;
}

</style>
