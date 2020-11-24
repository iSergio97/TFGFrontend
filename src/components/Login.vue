/* eslint-disable */
<template>
  <div class="login-body content has-text-centered">
    <h3> {{headerLang[lang]}} </h3>
    <form @submit.prevent="submitForm">
      <div v-if="submitError" class="login-error is-rounded">
        <i class="fa fa-warning"></i>
        {{errorFormRes[lang]}}
      </div>
      <div class="login-form">
        <div class="login-username">
          <div>
            <input v-model="username" class="input is-rounded" type="text"
                   v-bind:placeholder="usernameLang[lang]">
          </div>
        </div>
        <div class="login-password">
          <div>
            <input v-model="password" class="input is-rounded" type="password"
                   v-bind:placeholder="passwordLang[lang]">
          </div>
        </div>
        <div class="login-button">
          <!-- submitted ? 'button is-loading' : 'button is-success is-inverted is-rounded' -->
          <button :class="submitted ? 'button is-loading is-rounded'
           : 'button is-success is-inverted is-rounded'">
            {{ submitButton[lang] }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';
import axios from 'axios';

export default {
  name: 'Login',
  setup() {
    const session = Cookie.get('JSESSIONID');
    if (session) {
      window.location.href = '';
    }
    const lang = (Cookie.get('lang') !== undefined && Cookie.get('lang') < 2) ? Cookie.get('lang') : 0;
    const headerLang = ref(['Iniciar sesión', 'Login']);
    const usernameLang = ref(['Nombre de usuario', 'Username']);
    const passwordLang = ref(['Contraseña', 'Password']);
    const errorLang = ref(['Debe rellenar todos los campos', 'Both inputs are required']);
    const username = ref('');
    const password = ref('');
    const submitButton = ref(['Enviar', 'Submit']);
    const submitted = ref(false);
    const errorFormRes = ref(['El nombre de usuario o contraseña no son correctos',
      'Username and password are not correct']);
    const submitError = ref(false);
    const submitForm = () => {
      if (username.value.trim() === '' || password.value.trim() === '') {
        alert(errorLang.value[lang]);
        return;
      }
      submitted.value = true;
      axios.get(`http://localhost:8080/habitante/login?username=${username.value}&password=${password.value}`)
        .then((res) => console.log(res))
        .catch((res) => {
          console.log(res);
          submitError.value = true;
        });
      submitted.value = false;
    };
    return {
      username,
      usernameLang,
      password,
      passwordLang,
      headerLang,
      lang,
      submitted,
      submitButton,
      errorFormRes,
      submitError,
      submitForm,
    };
  },
};
</script>

<style scoped>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
* {
  padding-top: 1%;
}

input {
  width: 17.5%;
}

.login-error {
  color: #D8000C;
  margin: auto;
  width: 30%;
  background-color: #FFD2D2;
  padding-bottom: 1%;
}

.login-sucess {
  color: #4F8A10;
}

.login-info {
  color: #00529B;
}

.login-warning {
  color: #D8000C;
}
</style>
