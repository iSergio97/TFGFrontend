<template>
  <button @click="$emit('previous')" class="button is-link is-rounded prev-button"> Anterior
  </button>
  <button @click="$emit('rellenaConvivientes', convivientesEnSolicitud); $emit('next')"
          class="button is-success is-rounded next-button"> Siguiente
  </button>
  <br>
  <br>
  <div v-if="tipoOperacion !== 'MV'">
    <article class="message">
      <div class="message-header">
        <p>Aviso convivientes</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        La opción de solicitud que ha realizado no contempla la opción de realizar en grupo (con las
        personas que convive en su mismo domicilio). La única operación que puede realizar en grupo
        es la modificación por cambio de domicilio
      </div>
    </article>
  </div>
  <div class="columns" v-else>
    <div class="column is-1"></div>
    <div class="column">
      <ul>
        <li v-for="conviviente in convivientes">
          <label class="checkbox">
            <i class="fas fa-user-friends"></i>
            <input type="checkbox" @click="editarSolicitud(conviviente.id)"/>
            <p> {{ conviviente.nombre }}, {{ conviviente.primerApellido }}
              {{ conviviente.segundoApellido }} </p>
          </label>
        </li>
      </ul>
    </div>
    <div class="column is-1"></div>
  </div>

</template>

<script>
export default {
  name: 'ConvivientesComponent',
  props: ['convivientes', 'convivientesEnSolicitud', 'tipoOperacion'],
  setup(props) {
    let convivientesEnSolicitud = props.convivientesEnSolicitud;

    let convivientes = props.convivientes;

    const tipoOperacion = props.tipoOperacion;

    const editarSolicitud = (id) => {
      if (convivientesEnSolicitud.filter((conv) => conv.id === id).length === 0) {
        let conviviente = convivientes.filter((conv) => conv.id === id);
        convivientesEnSolicitud.push(conviviente[0]);
      } else {
        convivientesEnSolicitud = convivientesEnSolicitud.filter((conv) => conv.id !== id);
      }
    };

    return {
      convivientesEnSolicitud,
      tipoOperacion,
      editarSolicitud,
    };
  }
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

li {
  padding-bottom: 15px;
}
</style>
