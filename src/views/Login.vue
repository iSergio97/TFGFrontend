/* eslint-disable */
<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="notification is-danger" v-if="errorForm">
          <button class="delete" onclick="this.parentElement.style.display='none'"></button>
          {{errorFormRes[lang]}}
        </div>
        <div class="notification is-danger" v-if="errorNoUserFound">
          <button class="delete" onclick="this.parentElement.style.display='none'"></button>
          {{noUserFound[lang]}}
        </div>
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../images/login.png" alt="Login image">
            </figure>
            <form @submit.prevent="submitForm">
              <div class="field">
                <div class="control">
                  <input v-model="username"
                         :class="errorUsername ? 'input is-rounded is-danger' : 'input is-rounded'"
                         type="text" :placeholder="usernameLang[lang]">
                </div>
                <p class="help is-danger" v-if="errorUsername">{{errorUsernameLang[lang]}}</p>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="password"
                         :class="errorPassword ? 'input is-rounded is-danger' : 'input is-rounded'"
                         type="password" :placeholder="passwordLang[lang]">
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
import { Login } from '@/api/Login';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const session = Cookie.get('PMHSESSION');
    if (session) {
      router.push('/');
    }

    const lang = (Cookie.get('lang') !== undefined && Cookie.get('lang') < 2) ? Cookie.get('lang') : 0;
    const headerLang = ref(['Iniciar sesión', 'Login']);
    const usernameLang = ref(['Nombre de usuario', 'Username']);
    const passwordLang = ref(['Contraseña', 'Password']);
    const errorUsernameLang = ref(['El nombre de usuario no puede estar vacío', 'Username input can not be empty']);
    const errorUsername = ref(false);
    const errorPasswordLang = ref(['La contraseña no puede estar vacía', 'Password input can not be empty']);
    const errorPassword = ref(false);
    const username = ref('habitante0');
    const password = ref('habitante0');
    const submitButton = ref(['Enviar', 'Submit']);
    const submitted = ref(false);
    const errorForm = ref(false);
    const errorFormRes = ref(['Se ha producido un error. Inténtelo de nuevo más tarde', 'An error has occurred. Try it again later ']);
    const errorNoUserFound = ref(false);
    const noUserFound = ref(['El usuario o la contraseña son incorrectas', 'Username or password are incorrect']);
    const isMobile = /iPhone|iPad|iPod|/i.test(navigator.userAgent);
    const errorSafariLogin = ref(['Existe un error con los navegadores privados (Safari en iOS) que bloquea las sesiones empleadas en esta aplicación.\nSi desea usar la aplicación, emplee otro navegador como Firefox o Google Chrome',
      'There is an error with private browsers (Safari on iOS) that blocks the sessions used in this application.\nIf you want to use the application, please use another browser such as Firefox or Google Chrome ']);
    const submitForm = async () => {
      errorUsername.value = username.value.trim() === '';
      errorPassword.value = password.value.trim() === '';
      if (!errorUsername.value && !errorPassword.value) {
        submitted.value = true;
        errorNoUserFound.value = false;
        errorForm.value = false;
        const { user, statusUser, convivientes } = await Login({
          username: username.value,
          password: password.value,
        });

        // Si el usuario existe y la contraseña es correcta
        switch (statusUser.value) {
          case 200: // El usuario y la contraseña son correctas
            /* eslint-disable */
            const { cuentaUsuario } = user.value;
            const { encrypt } = PMHCrypto();
            const PMHSESSION = encrypt(cuentaUsuario.username + '¥' + cuentaUsuario.id, cuentaUsuario.salt);
            const user_rol = encrypt(cuentaUsuario.rol, cuentaUsuario.salt);
            localStorage.setItem('PMHSESSION', PMHSESSION);
            localStorage.setItem('SALT', cuentaUsuario.salt);
            localStorage.setItem('USER_PRO', JSON.stringify(user.value));
            localStorage.setItem('USER_ROL', user_rol);
            Cookie.set('PMHSESSION', PMHSESSION);
            Cookie.set('SALT', cuentaUsuario.salt);
            localStorage.setItem('CONV', JSON.stringify(convivientes.value));
            window.location.href = '/'; // Se usa esto en vez de router.push porque si no, no recarga la barra de navegación
            break;
          case 350: // Error en la combinación usuario/contraseña.
            errorNoUserFound.value = true;
            submitted.value = false;
            break;
          case 370: // Error inesperado, inténtelo de nuevo más tarde.
            errorForm.value = false;
            submitted.value = false;
            break;
          case 404:
            alert('Error en la base de datos');
            submitted.value = false;
            errorForm.value = true;
            // router.push('/database-error');
            break;
          default: //
            // TODO: Redirigir a la página de error de conexión con la BBDD
            if(isMobile) {
              alert(errorSafariLogin.value[lang]);
              break;
            } else {
              alert('Error en la base de datos');
              submitted.value = false;
              router.push('/database-error');
              break;
            }
        }
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
</style>
