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
import { ref, watch } from 'vue';

export default {
  name: 'RequestFormComponent',
  props: {
    id: Number,
    convivientes: Array,
  },
  setup(props) {
    const create = props.id === undefined;
    const tipos = ref('A');
    watch(() => tipos.value);
    const subtipos = ref('AN');
    const solicitaPor = ref(props.convivientes[0].id);
    const submitted = ref(false);
    watch(() => subtipos.value);
    const changeSubtipo = () => {
      if (tipos.value === 'A') {
        subtipos.value = 'AN';
      } else if (tipos.value === 'B') {
        subtipos.value = 'BCD';
      } else {
        subtipos.value = 'MD';
      }
    };
    const submitRequest = () => {
      console.log(tipos.value);
      console.log(subtipos.value);
      console.log(solicitaPor.value);
    };
    return {
      create,
      tipos,
      subtipos,
      solicitaPor,
      submitted,
      changeSubtipo,
      submitRequest,
    };
  },
};
</script>

<style scoped>
.card {
  text-align: center;
}
</style>
