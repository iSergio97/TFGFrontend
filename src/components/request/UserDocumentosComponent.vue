<template>
  <button @click="$emit('previous')" class="button is-link is-rounded prev-button"> Anterior
  </button>
  <button @click="$emit('next')" class="button is-success is-rounded next-button"> Siguiente
  </button>
</template>

<script>
export default {
  name: 'UserDocumentosComponent'
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
