/* eslint-disable */
<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="notification is-danger" v-if="errorForm">
          <button class="delete"></button>
          {{errorFormRes[lang]}}
        </div>
        <div class="notification is-danger" v-if="errorNoUserFound">
          <button class="delete"></button>
          {{noUserFound[lang]}}
        </div>
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../images/login.png">
            </figure>
            <form @submit.prevent="submitForm">
              <div class="field">
                <div class="control">
                  <input v-model="username"
                         :class="errorUsername ? 'input is-rounded is-danger' : 'input is-rounded'"
                         type="text"  :placeholder="usernameLang[lang]">
                </div>
                <p class="help is-danger" v-if="errorUsername">{{errorUsernameLang[lang]}}</p>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="password"
                         :class="errorPassword ? 'input is-rounded is-danger' : 'input is-rounded'"
                         type="password"  :placeholder="passwordLang[lang]">
                </div>
                <p class="help is-danger" v-if="errorPassword">{{errorPasswordLang[lang]}}</p>
              </div>
              <button
                      :class="[submitted ?
                      'button is-info is-rounded is-large is-fullwidth is-loading' :
                      'button is-info is-rounded is-large is-fullwidth']">
                {{ submitButton[lang] }} <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
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
    const errorUsernameLang = ref(['El nombre de usuario no puede estar vacío', 'Username input can not be empty']);
    const errorUsername = ref(false);
    const errorPasswordLang = ref(['La contraseña no puede estar vacía', 'Password input can not be empty']);
    const errorPassword = ref(false);
    const username = ref('');
    const password = ref('');
    const submitButton = ref(['Enviar', 'Submit']);
    const submitted = ref(false);
    const errorForm = ref(false);
    const errorFormRes = ref(['Se ha producido un error. Inténtelo de nuevo más tarde', 'An error has occurred. Try it again later ']);
    const errorNoUserFound = ref(false);
    const noUserFound = ref(['El usuario o la contraseña son incorrectas', 'Username or password are incorrect']);
    const submitForm = () => {
      errorUsername.value = username.value.trim() === '';
      errorPassword.value = password.value.trim() === '';

      if (!errorUsername.value && !errorPassword.value) {
        submitted.value = true;
        errorNoUserFound.value = false;
        errorForm.value = false;
        axios.get(`http://localhost:8080/habitante/login?username=${username.value}&password=${password.value}`)
          .then((res) => {
            const { status, object } = res.data;
            if (status === 200) {
              // Redirigir a la página de home y guardar los datos del habitante devuelto
              console.log(object);
            } else {
              console.error(status);
              submitted.value = false;
              errorForm.value = true;
            }
          })
          .catch(() => {
            errorForm.value = true;
            submitted.value = false;
          });
      }
    };
    return {
      username,
      usernameLang,
      errorUsername,
      errorUsernameLang,
      password,
      passwordLang,
      errorPassword,
      errorPasswordLang,
      headerLang,
      lang,
      submitted,
      submitButton,
      errorForm,
      errorFormRes,
      noUserFound,
      errorNoUserFound,
      submitForm,
    };
  },
};
</script>

<style scoped>
input {
  text-align: center;
}
.login-error {
  color: #D8000C;
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
