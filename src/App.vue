<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"
                   @click="closeHamburgerMenu">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>

      <a role="button" class="navbar-burger burger" aria-label="menu"
         aria-expanded="false" data-target="navbarBasicExample"
         :class="{ 'is-active': isHamburgerOpen }" @click="openHamburgerMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu"
         :class="{ 'is-active': isHamburgerOpen }">
      <div class="navbar-start" v-if="session !== undefined">
        <router-link to="" class="navbar-item" @click="openHamburgerMenu">
          Ver qué hacer
        </router-link>

        <div class="navbar-item has-dropdown"
             :class="{ 'is-active': isHamburgerOpen }" @click="openHamburgerMenu"
             v-if="session !== undefined">
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

      <div class="navbar-end" v-if="session === undefined">
        <div class="navbar-item">
          <div class="buttons" :class="{ 'is-active': isHamburgerOpen }"
               @click="closeHamburgerMenu">
            <router-link to="/login" class="button is-light">
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
  name: 'App',
  setup() {
    const session = Cookie.get('JSESSIONID');
    console.log(session);
    const lang = (Cookie.get('lang') !== undefined && Cookie.get('lang') < 2) ? Cookie.get('lang') : 0;
    const loginLang = ref(['Iniciar sesión', 'Login']);
    const homeLang = ref(['Inicio', 'Home']);
    const habitanteLang = ref(['Opciones de habitante', 'Habitant options']);
    const operationsLang = ref(['Operaciones', 'Operations']);
    const requestLang = ref(['Solicitudes', 'Requests']);
    const profileLang = ref(['Perfil', 'Profile']);
    const isHamburgerOpen = ref(false);
    const openHamburgerMenu = () => {
      isHamburgerOpen.value = !isHamburgerOpen.value;
    };
    const closeHamburgerMenu = () => {
      if (isHamburgerOpen.value === true) {
        isHamburgerOpen.value = !isHamburgerOpen.value;
      }
    };
    return {
      loginLang,
      lang,
      homeLang,
      habitanteLang,
      operationsLang,
      requestLang,
      profileLang,
      isHamburgerOpen,
      session,
      openHamburgerMenu,
      closeHamburgerMenu,
    };
  },
};
</script>
