<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" v-if="session">
      <div class="navbar-start">

        <a class="navbar-item">
          {{profileLang[lang]}}
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            {{habitanteLang[lang]}}
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              {{requestLang[lang]}}
            </a>
            <a class="navbar-item">
              {{ operationsLang[lang] }}
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              {{reportLang[lang]}}
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-primary" @click="logout">
              <strong>{{logoutLang[lang]}}</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" v-else>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-success">
              {{ loginLang[lang] }}
            </a>
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
  name: 'App',
  setup() {
    const session = Cookie.get('JSESSIONID');
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
      Cookie.remove('JSESSIONID');
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
