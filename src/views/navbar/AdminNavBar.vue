<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-end">
        <router-link to="/admin/operations/list" class="navbar-item" v-if="session">
          {{operationsLang[lang]}}
        </router-link>
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-primary" @click="logout" v-if="session">
              <strong>{{logoutLang[lang]}}</strong>
            </button>
            <router-link to="login" class="button is-success" v-if="!session">
              {{ loginLang[lang] }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import Cookie from 'js-cookie';
import { ref } from 'vue';

export default {
  name: 'AdminNavbar',

  setup() {
    const session = Cookie.get('PMHSESSION');
    const lang = (Cookie.get('lang') !== undefined && Cookie.get('lang') < 2) ? Cookie.get('lang') : 0;
    const loginLang = ref(['Iniciar sesión', 'Login']);
    const logoutLang = ref(['Cerrar sesión', 'Logout']);
    const homeLang = ref(['Inicio', 'Home']);
    const habitanteLang = ref(['Opciones de habitante', 'Habitant options']);
    const operationsLang = ref(['Operaciones', 'Operations']);
    const requestLang = ref(['Solicitudes', 'Requests']);
    const profileLang = ref(['Perfil', 'Profile']);
    const reportLang = ref(['Reportar un problema', 'Report an issue']);
    const logout = () => {
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.reload();
    };
    return {
      loginLang,
      logoutLang,
      lang,
      homeLang,
      habitanteLang,
      operationsLang,
      requestLang,
      profileLang,
      session,
      reportLang,
      logout,
    };
  },
};
</script>

<style>
nav {
  background: #B8C1C8;
  border-bottom: 1px solid #989EA4;
  border-top: 1px solid #717D85;
  margin: 0;
  padding: 2px 0 0 12px;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
}
</style>
