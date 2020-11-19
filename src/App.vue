<template>
  <div id="">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/#">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu"
           aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/#" class="navbar-item">
            {{ homeLang[lang] }}
          </router-link>

          <router-link to="" class="navbar-item">
            Ver qué hacer
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ habitanteLang[lang] }}
            </a>

            <div class="navbar-dropdown">
              <router-link to="/operations" class="navbar-item">
                {{ operationsLang[lang] }}
              </router-link>
              <router-link to="/requests" class="navbar-item">
                {{ requestLang[lang] }}
              </router-link>
              <hr class="navbar-divider">
              <router-link to="/profile" class="navbar-item">
                {{ profileLang[lang] }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">
                {{ loginLang[lang] }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
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
    const homeLang = ref(['Inicio', 'Home']);
    const habitanteLang = ref(['Opciones de habitante', 'Habitant options']);
    const operationsLang = ref(['Operaciones', 'Operations']);
    const requestLang = ref(['Solicitudes', 'Requests']);
    const profileLang = ref(['Perfil', 'Profile']);
    if (session) {
      window.location.href = 'profile';
    }
    return {
      loginLang,
      lang,
      homeLang,
      habitanteLang,
      operationsLang,
      requestLang,
      profileLang,
    };
  },
};
</script>

<style>
</style>
