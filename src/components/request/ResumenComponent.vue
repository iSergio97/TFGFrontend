<template>
  <button @click="$emit('previous')" class="button is-link is-rounded prev-button"> Anterior
  </button>
  <button @click="$emit('submitForm');"
          class="button is-success is-warning next-button"> Finalizar
  </button>
  <br>
  <div class="columns is-centered">
    <div class="column is-half">
      <article class="message is-info">
        <div class="message-header">
          <p>Revisión final</p>
        </div>
        <div class="message-body">
          Recuerde revisar los datos de la solicitud que va a enviar, así podrá conseguir que la
          persona
          encargada de revisarla lo valide con mayor rapidez y obtenga sus datos actualizados antes.
        </div>
      </article>
    </div>
  </div>
  <br>
  <div class="columns">
    <div class="column">
      <div class="card">
        <div class="card">
          <div class="content">
            <div v-if="opcion === 'A' && subOpcion === 'ACR' || subOpcion === 'MV'">
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <label class="label"> Tipo de vivienda </label>
                    <p class="control">
                      <input class="input" type="text" :value="datos.tipoVivienda" disabled
                             :class="datos.tipoVivienda == userLogged.hoja.numeracion.calle.tipo ? 'is-success' : 'is-danger'">
                    </p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <label class="label">N&uacute;mero</label>
                    <p class="control">
                      <input class="input" type="text" :value="datos.numeracion.calle.nombre"
                             disabled
                             :class="datos.numeracion.calle.nombre === userLogged.hoja.numeracion.calle.nombre ? 'is-success' : 'is-danger'">
                    </p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <label class="label">N&uacute;mero</label>
                    <p class="control">
                      <input class="input" type="text" :value="datos.numeracion.numero" disabled
                             :class="datos.numeracion.numero === userLogged.hoja.numeracion.calle.nombre ? 'is-success' : 'is-danger'">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="subOpcion === 'MD'">
              <div class="is-centered">
                <br>
                <div class="field">
                  <label class="label">Nombre</label>
                  <div class="control">
                    <input class="input" type="text" :value="datos.nombre"
                           :class="datos.nombre === userLogged.nombre ? 'is-success' : 'is-danger'"
                           disabled>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Primer apellido</label>
                  <div class="control">
                    <input class="input" type="text" :value="datos.primerApellido"
                           :class="datos.primerApellido === userLogged.primerApellido ? 'is-success' : 'is-danger'"
                           disabled>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Segundo apellido</label>
                  <div class="control">
                    <input class="input" type="text" :value="datos.segundoApellido"
                           :class="datos.segundoApellido === userLogged.segundoApellido ? 'is-success' : 'is-danger'"
                           disabled>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Fecha de nacimiento</label>
                  <div class="control">
                    <input class="input" type="date"
                           :value="new Date(datos.fechaNacimiento).toISOString().split('T')[0]"
                           :class="datos.fechaNacimiento === userLogged.fechaNacimiento ? 'is-success' : 'is-danger'"
                           disabled>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Identificación</label>
                  <div class="control">
                    <input class="input" type="text" :value="datos.tIdentificacion"
                           :class="datos.tIdentificacion === userLogged.identificacion ? 'is-success' : 'is-danger'"
                           disabled>
                  </div>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="card">
        <div v-if="archivos.length > 0">
          <ul v-for="file in archivos" :key="file.name">
            <li v-if="file.type === 'PDF'" class="title is-5">
              <span>
                <i class="far fa-file-pdf"></i>
                <p class="archivo">{{ file.name }}</p>
                <i class="fas fa-eye" @click="previewDoc(file)"></i>

              </span>
            </li>
            <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                class="title is-5">
              <span>
                <i class="far fa-file-image"></i>
                <p class="archivo">{{ file.name }}</p>
                <i class="fas fa-eye" @click="previewDoc(file)"></i>
              </span>
            </li>
          </ul>
        </div>
        <div v-else>
          Actualmente no presenta ningún documento, no podrá enviar la solicitud si no presenta los
          documentos necesarios (los que están con un color rojo) en la pestaña de Documentos.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumenComponent',
  props: ['userLogged', 'documento', 'datos'],
  setup(props) {
    let userLogged = props.userLogged;
    let documento = props.documento;
    let {
      archivosPreview,
      archivos
    } = documento;
    let datos = props.datos;
    let {
      opcion,
      subOpcion
    } = datos;

    const previewDoc = (documento) => {
      const archivo = archivosPreview.value.filter((doc) => doc.alias === documento.name)[0].file;
      const url = URL.createObjectURL(archivo);
      window.open(url);
    };

    return {
      opcion,
      subOpcion,
      archivos,
      previewDoc,
    };
  }

};
</script>

<style scoped>
* {
  text-align: center;
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


.input {
  width: 35%;
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
