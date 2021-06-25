<template>
  <header class="header">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item-logo" to="/">
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
          <router-link to="/user/profile" class="navbar-item" v-if="session">
            {{profileLang[lang]}}
          </router-link>
          <router-link to="/user/requests/list" class="navbar-item" v-if="session">
            {{requestLang[lang]}}
          </router-link>
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-primary" @click="logout" v-if="session">
                <strong>{{logoutLang[lang]}}</strong>
              </button>
              <router-link to="login" class="button nav-link" v-if="!session">
                <strong> {{ loginLang[lang] }} </strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <router-view/>
</template>

<script>
import Cookie from 'js-cookie';
import { ref } from 'vue';

export default {
  name: 'UserNavbar',

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

<style scoped>
nav {
  background: #B8C1C8;
  margin: 0;
  padding: 2px 0 0 12px;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
}

.navbar-item-logo {
  background: url("../../images/logo_transparent.png") no-repeat center center;
  background-size: cover;
  width: 220px;
}

</style>
