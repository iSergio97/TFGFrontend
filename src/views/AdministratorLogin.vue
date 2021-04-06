/* eslint-disable */
<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Adminitrator Login</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../images/admin.png" width="150" alt="Login image">
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
            <br>
            <div>
              <p> ¿Tiene cuenta de habitante? Haga click
                <router-link to="/login"> aquí </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { LoginAdmin } from '@/api/LoginAdmin';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'AdministratorLogin',
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
    const username = ref('sergio');
    const password = ref('sergio');
    const submitButton = ref(['Enviar', 'Submit']);
    const submitted = ref(false);
    const errorNoUserFound = ref(false);
    const isMobile = /iPhone|iPad|iPod|/i.test(navigator.userAgent);
    const submitForm = async () => {
      errorUsername.value = username.value.trim() === '';
      errorPassword.value = password.value.trim() === '';
      if (!errorUsername.value && !errorPassword.value) {
        submitted.value = true;
        errorNoUserFound.value = false;
        const { user, statusRes } = await LoginAdmin({
          username: username.value,
          password: password.value,
        });

        // Si el usuario existe y la contraseña es correcta
        switch (statusRes.value) {
          case 200: // El usuario y la contraseña son correctas
            /* eslint-disable */
            const { cuentaUsuario } = user.value;
            const { encrypt } = PMHCrypto();
            const PMHSESSION = encrypt(cuentaUsuario.username + '¥' + cuentaUsuario.id, cuentaUsuario.salt);
            const user_rol = encrypt(cuentaUsuario.rol, cuentaUsuario.salt);
            const user_value = JSON.stringify(user.value);
            localStorage.setItem('PMHSESSION', PMHSESSION);
            localStorage.setItem('SALT', cuentaUsuario.salt);
            localStorage.setItem('USER_PRO', encrypt(user_value, cuentaUsuario.salt));
            localStorage.setItem('USER_ROL', user_rol);
            Cookie.set('PMHSESSION', PMHSESSION);
            Cookie.set('SALT', cuentaUsuario.salt);
            window.location.href = '/'; // Se usa esto en vez de router.push porque si no, no recarga la barra de navegación
            break;
          case 350: // Error en la combinación usuario/contraseña.
            submitted.value = false;
            await Swal.fire({
              title: 'Error',
              text: 'Usuario o contraseña incorrecta',
              icon: 'error',
              target: document.getElementById("error"),
            });
            break;
          case 370: // Error inesperado, inténtelo de nuevo más tarde.
            submitted.value = false;
            await Swal.fire('Oops...', 'Se ha producido un error inesperado. Inténtelo de nuevo más tarde', 'error')
            break;
          case 404:
            if(isMobile) {
              await Swal.fire('Oops...', 'El sistema operativo iOS no acepta el almacén de cierta información necesaria.\n\nSi desea continuar, inicie sesión con otro dispositivo', 'error');
            } else {
              await Swal.fire('Oops...', 'Se ha producido un error en la base de datos. Inténtelo de nuevo más tarde', 'error');
            }
            submitted.value = false;
            break;
          default:
            await router.push('/database-error');
            break;
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
      errorNoUserFound,
      submitForm,
    };
  },
}
</script>

<style scoped>
input {
  text-align: center;
}
</style>
