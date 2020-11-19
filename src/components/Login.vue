<template>
  <div class="login-body content has-text-centered">
    <h3> {{headerLang[lang]}} </h3>
    <form @submit.prevent="submitForm">
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
          <button class="button is-info is-light"> Prueba </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';

export default {
  name: 'Login',
  setup() {
    const session = Cookie.get('JSESSIONID');
    const lang = (Cookie.get('lang') !== undefined && Cookie.get('lang') < 2) ? Cookie.get('lang') : 0;
    if (session) {
      window.location.href = '';
    }
    const headerLang = ref(['Iniciar sesión', 'Login']);
    const usernameLang = ref(['Nombre de usuario', 'Username']);
    const passwordLang = ref(['Contraseña', 'Password']);
    const errorLang = ref(['Debe rellenar todos los campos', 'Both inputs are required']);
    const username = ref('');
    const password = ref('');
    const submitForm = () => {
      if (username.value.trim() === '' || password.value.trim() === '') {
        alert(errorLang.value[lang]);
      }
    };
    return {
      username,
      usernameLang,
      password,
      passwordLang,
      headerLang,
      lang,
      submitForm,
    };
  },
};
</script>

<style scoped>
* {
  padding-top: 1%;
}

input {
  width: 17.5%;
}
</style>
