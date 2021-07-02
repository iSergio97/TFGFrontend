<template>
  <section class="hero is-default is-bold">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link class="navbar-item-logo" to="/"> </router-link>
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end" v-if="session">
              <div class="tabs is-right">
                <ul>
                  <li :class="componentName === 'Perfil' ? 'is-active' : ''">
                    <router-link to="/user/profile">Perfil</router-link>
                  </li>
                  <li
                    :class="
                      componentName === 'UserRequestList' ? 'is-active' : ''
                    "
                  >
                    <router-link to="/user/requests/list"
                      >Solicitudes</router-link
                    >
                  </li>
                  <p class="control">
                    <a>
                      <span class="icon">
                        <i class="fas fa-sign-out-alt"></i>
                      </span>
                      <span> Cerrar sesión </span>
                    </a>
                  </p>
                </ul>
              </div>
            </div>
            <div class="navbar-end" v-if="!session">
              <div class="tabs is-right">
                  <p class="control">
                    <router-link to="/login">
                      <span class="icon">
                        <i class="fas fa-sign-in-alt"></i>
                      </span>
                      <span> Iniciar sesión </span>
                    </router-link>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
  <router-view />
</template>

<script>
/* eslint-disable */
import Cookie from "js-cookie";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "UserNavbar",

  setup() {
    const route = useRoute();
    const componentName = route.name;
    const session = Cookie.get("PMHSESSION");
    const lang =
      Cookie.get("lang") !== undefined && Cookie.get("lang") < 2
        ? Cookie.get("lang")
        : 0;
    const loginLang = ref(["Iniciar sesión", "Login"]);
    const logoutLang = ref(["Cerrar sesión", "Logout"]);
    const homeLang = ref(["Inicio", "Home"]);
    const habitanteLang = ref(["Opciones de habitante", "Habitant options"]);
    const operationsLang = ref(["Operaciones", "Operations"]);
    const requestLang = ref(["Solicitudes", "Requests"]);
    const profileLang = ref(["Perfil", "Profile"]);
    const reportLang = ref(["Reportar un problema", "Report an issue"]);
    const logout = () => {
      Cookie.remove("PMHSESSION");
      Cookie.remove("SALT");
      localStorage.clear();
      window.location.reload();
    };
    return {
      componentName,
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
.navbar-item-logo {
  background: url("../../images/logo_transparent.png") no-repeat center center;
  background-size: cover;
  width: 220px;
}
</style>
