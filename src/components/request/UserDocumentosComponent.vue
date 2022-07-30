<template>
  <button @click="$emit('previous')" class="button is-link is-rounded prev-button"> Anterior
  </button>
  <button @click="$emit('next')" class="button is-success is-rounded next-button"> Siguiente
  </button>
  <div v-for="documento in documentosNecesarios">
    <div v-if="documento.required" class="file is-danger">
      <label>
        <p>{{ documento.name }}</p>
        <input class="file-input" type="file" :onchange="adjuntarArchivo">
        <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Adjuntar documento
                </span>
      </span>
      </label>
    </div>
    <div v-else class="file is-info">
      <label>
        <p>{{ documento.name }}</p>
        <input class="file-input" type="file" :onchange="adjuntarArchivo">
        <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Adjuntar documento
                </span>
      </span>
      </label>
    </div>
  </div>
  <div class="card" id="files">
    <div class="card-content">
      <div class="content">
        <div v-if="archivos.length > 0">
          <ul v-for="file in archivos" :key="file.name">
            <li v-if="file.type === 'PDF'" class="title is-5">
              <i class="far fa-file-pdf"></i>
              <p @click="previewDoc(file)" class="archivo">{{ file.name }}</p>
              <i class="fas fa-trash" @click="deleteFile(file)"></i>
              <!--<button class="delete" @click="deleteFile(file)"></button> -->
            </li>
            <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                class="title is-5">
              <i class="far fa-file-image" @click="previewDoc(file)"></i>
              <p @click="previewDoc(file)" class="archivo">{{ file.name }}</p>
              <i class="fas fa-trash" @click="deleteFile(file)"></i>
              <!--<button class="delete" @click="deleteFile(file)"></button>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UserDocumentosComponent',
  props: ['tipoOperacion', 'nacionalidad'],
  async setup(props) {
    console.log(props.nacionalidad);
    let documentosNecesarios = ref([]);
    switch (props.tipoOperacion) {
      case 'ACR':
      case 'MV':
      case 'MRE':
        let dni = {
          name: 'DNI o Libro de Familia',
          required: true,
        };
        let pasaporte = {
          name: 'Extranjeros deben presentar pasaporte o permiso de residencia',
          required: props.nacionalidad !== 108,
        };
        documentosNecesarios.value.push(dni);
        documentosNecesarios.value.push(pasaporte);
        break;
      case 'AIM':
        break;
      case 'MD':
        break;
      case 'MRN':
        break;
    }
    const archivosName = ref([]);

    const archivos = ref([]);

    const formData = new FormData();

    const archivosPreview = ref([]);

    const adjuntarArchivo = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      formData.append('file', file, file.name);
      if (!archivosName.value.includes(file.name)) {
        archivosName.value.push(file.name);
        const type = file.name.toString()
          .split('.');
        archivos.value.push({
          name: file.name,
          type: type[type.length - 1].toUpperCase(),
        });
        archivosPreview.value.push({
          name: file.name,
          file: file
        });
      }
    };

    const previewDoc = (documento) => {
      const archivo = archivosPreview.value.filter((doc) => doc.name === documento.name)[0].file;
      const url = URL.createObjectURL(archivo);
      window.open(url);
    };

    const deleteFile = (file) => {
      let confirma = window.confirm('¿Desea eliminar este documento?');
      if (confirma) {
        const index = archivosName.value.indexOf(file.name);
        const { length } = archivosName.value;
        archivosName.value = archivosName.value
          .slice(0, index)
          .concat(archivosName.value.slice(index + 1, length + 1));
        archivos.value = archivos.value
          .slice(0, index)
          .concat(archivos.value.slice(index + 1, length + 1));
      }
    };

    return {
      archivos,
      archivosName,
      documentosNecesarios,
      previewDoc,
      deleteFile,
      adjuntarArchivo,
    };
  }
};
</script>

<style scoped>
*, .file {
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

i, .archivo {
  cursor: pointer;
}

.file {
  display: block;
}
</style>
