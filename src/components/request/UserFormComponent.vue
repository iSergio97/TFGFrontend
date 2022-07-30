<template>
  <button class="button is-link is-rounded prev-button" disabled> Anterior</button>
  <button
    @click="$emit('completaSolicitud', {opcion, subOpcion, tipoVivienda, vivienda, numeracion, nombre, primerApellido, segundoApellido, fechaNacimiento, tIdentificacion}); $emit('next');"
    class="button is-success is-rounded next-button"> Siguiente
  </button>
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
                          Cambio de residencia
                        </option>
                        <option v-if="opcion === 'A'" value="AIM">
                          De inmigrantes
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { TiposCalleGET } from '../../api/TiposCalleGET';
import { CalleGET } from '../../api/CalleGET';
import { NumeracionGET } from '../../api/NumeracionGET';

export default {
  name: 'UserFormComponent',
  props: {
    userLogged: Object,
    position: Number,
    datos: Object
  },
  async setup(props) {
    console.log(props.datos);
    const opcion = ref(props.datos.opcion);
    // ['ACR', 'AIM', 'MD', 'MV', 'MRN']
    const subOpcion = ref(props.datos.subOpcion);
    watch(opcion, (selectedOption) => {
      if (selectedOption === 'A') {
        subOpcion.value = 'ACR';
      } else if (selectedOption === 'B') {
        subOpcion.value = 'BNI';
      } else {
        subOpcion.value = 'MD';
      }
    });

    const tipoViviendas = (await TiposCalleGET()).tipos;
    const tipoVivienda = ref(props.datos.tipoVivienda);
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
    const nombre = ref(props.datos.nombre);
    const primerApellido = ref(props.datos.primerApellido);
    const segundoApellido = ref(props.datos.segundoApellido);
    const fechaNacimiento = ref(new Date(props.datos.fechaNacimiento).toISOString()
      .split('T')[0]);
    const tIdentificacion = props.datos.identificacion !== null ?
      ref(props.userLogged.identificacion) : ref('');

    return {
      opcion,
      subOpcion,
      nombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      tIdentificacion,
      tipoViviendas,
      tipoVivienda,
      viviendas,
      vivienda,
      numeracionesCalle,
      numeracion,
    };
  },
};
</script>

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

.next-button {
  position: absolute;
  right: 0;
  transform: translateY(-50%);
}

.prev-button {
  position: absolute;
  left: 0;
  transform: translateY(-50%);
}
</style>
