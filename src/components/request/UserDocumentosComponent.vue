<template>
  <button @click="$emit('previous')" class="button is-link is-rounded prev-button"> Anterior
  </button>
  <button @click="$emit('rellenaDocumentos', {documento});$emit('next')"
          class="button is-success is-rounded next-button"> Siguiente
  </button>
  <div class="column"></div>
  <div v-for="documento in documentosNecesarios" class="column">
    <div v-if="documento.required && !documento.done" class="file is-danger">
      <p>{{ documento.name }}</p>
      <label>
        <input class="file-input" type="file"
               @change="[adjuntarArchivo($event, documento)]">
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
    <div v-else-if="!documento.required" class="file is-info">
      <p>{{ documento.name }}</p>
      <label>
        <input class="file-input" type="file" @change="adjuntarArchivo($event, documento)">
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
  <div class="column"></div>
  <div class="card" id="files">
    <div class="card-content">
      <div class="content">
        <div v-if="archivos.length > 0">
          <ul v-for="(file) in archivos" :key="file.name">
            <li v-if="file.type === 'PDF'" class="title is-5">
              <span>
                <i class="far fa-file-pdf"></i>
                <p class="archivo">{{ file.name }}</p>
                <i class="fas fa-eye" @click="previewDoc(file)"></i>
                <i class="fas fa-trash" @click="deleteFile(file);"></i>
              </span>
            </li>
            <li v-else-if="file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPGE'"
                class="title is-5">
              <span>
                <i class="far fa-file-image"></i>
                <p class="archivo">{{ file.name }}</p>
                <i class="fas fa-eye" @click="previewDoc(file)"></i>
                <i class="fas fa-trash" @click="deleteFile(file);"></i>
              </span>
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
  props: ['tipoOperacion', 'nacionalidad', 'documento'],
  async setup(props) {
    let documentosNecesarios = ref(props.documento.documentosNecesarios);
    const archivosName = ref(props.documento.archivosName);
    const archivosPreview = ref(props.documento.archivosPreview);
    const archivos = ref(props.documento.archivos);

    const formData = props.documento.formData;

    if (documentosNecesarios.value.length == 0) {
      switch (props.tipoOperacion) {
        case 'ACR':
        case 'AIM':
        case 'MV':
        case 'MRE':
          let dni = {
            alias: 'DNI',
            name: 'DNI o Libro de Familia',
            required: true,
            done: false,
            fileName: '',
          };
          let alias = props.nacionalidad !== 108 ? 'Documentos adicionales' : 'Pasaporte';
          let pasaporte = {
            alias: 'alias',
            name: 'Extranjeros deben presentar pasaporte o permiso de residencia',
            required: props.nacionalidad !== 108,
            done: false,
            fileName: '',
          };
          documentosNecesarios.value.push(dni);
          documentosNecesarios.value.push(pasaporte);
          break;
        default:
          let documento = {
            alias: 'Documento',
            name: 'Documento que acredite el cambio que vas a realizar',
            required: true,
            done: false,
            fileName: '',
          };
          let dniAntiguo = {
            alias: 'DocumentoAntiguo',
            name: 'Si realiza un cambio en su documento de identidad, debe añadir el antiguo',
            required: false,
            done: false,
            fileName: '',
          };
          documentosNecesarios.value.push(documento);
          documentosNecesarios.value.push(dniAntiguo);
          break;
      }
    }

    const adjuntarArchivo = (e, documento) => {
      e.preventDefault();
      let alias = documento.alias;
      const file = e.target.files[0];
      let split = file.name.toString()
        .split('.');
      let type = split[split.length - 1].toUpperCase();
      let bannedTypes = ['CSS', 'JS', 'XTHML', 'HTML', 'TXT', 'XML', 'PPTX', 'EXE', 'BAT', 'RAR', 'ZIP', '7ZIP'];
      if (bannedTypes.includes(type)) {
        alert('Formato de archivo no soportado');
        return;
      }
      if (!archivosName.value.includes(file.name)) {
        formData.append('file', file, file.name);
        archivosName.value.push(file.name);
        const type = file.name.toString()
          .split('.');
        archivos.value.push({
          name: alias,
          type: type[type.length - 1].toUpperCase(),
        });
        archivosPreview.value.push({
          name: file.name,
          alias: alias,
          file: file
        });
      }

      let docsNecesarios = documentosNecesarios.value.filter(doc => doc.alias == alias)[0];
      docsNecesarios.done = true;
    };

    const previewDoc = (documento) => {
      const archivo = archivosPreview.value.filter((doc) => doc.alias === documento.name)[0].file;
      const url = URL.createObjectURL(archivo);
      window.open(url);
    };

    const deleteFile = (file) => {
      let confirma = window.confirm('¿Desea eliminar este documento?');
      if (confirma) {
        const index = archivosName.value.filter(archivo => archivo.alias === file.name);
        documentosNecesarios.value.filter(doc => doc.alias === file.name)[0].done = false;
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
  padding-left: 3px;
  display: block;
}

.file {
  display: block;
}

i {
  display: inline-block;
}
</style>
