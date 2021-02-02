<template>
  <div v-if="!isMobile">
    <div class='columns'>
      <div class='container profile'>
        <div class='section profile-heading'>
          <div class='columns is-mobile is-multiline'>
            <div class='column is-2'>
          <span class='header-icon user-profile-image'>
            <img alt='User profile image' :src='image'>
          </span>
            </div>
            <div class='column is-4-tablet is-10-mobile name'>
              <p>
                <span class='title is-bold'>{{ nombre }}</span>
              </p>
              <p> {{ apellidos }} </p>
            </div>
            <!-- Recorrer el array del localStorage de los convivientes y
            hacer un print de los nombres, apellidos de los mismos, -->
            <div class='column is-6-tablet is-4-mobile has-text-centered'>
              <div class="card">
                <div class="card-content">
                  <!-- TODO: En el login, realizar una petición para devovler los convivientes
                      de dicha persona y almacenarlos en caché -->
                  <p class="title">
                    Convivientes
                  </p>
                  <p class="subtitle" v-for="(conviviente, index) in convivientes" :key="index">
                    {{conviviente}}
                  </p>
                </div>
                <footer class="card-footer">
                  <p class="card-footer-item">
                    Los convivientes son las personas que viven contigo.
                    Si uno de los que aparece aquí es menor, las personas mayores de edad pueden
                    realizar una solicitud de edición de datos por el menor de edad.
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <div class="card" :width="innerWidth">
        <div class="card-content">
          <!-- TODO: En el login, realizar una petición para devovler los convivientes
              de dicha persona y almacenarlos en caché -->
          <p class="title">
            {{nombre}}
          </p>
          <p class="subtitle">
            {{apellidos}}
          </p>
        </div>
        <footer class="card-footer"
                style="width: 50%; display: block; margin-left: auto; margin-right: auto">
          <p class="card-footer-item">
            <span class='header-icon user-profile-image'>
              <img alt='User profile image' :src='image'>
            </span>
          </p>
        </footer>
      </div>
      <div class="card" :width="innerWidth">
        <div class="card-content">
          <!-- TODO: En el login, realizar una petición para devovler los convivientes
              de dicha persona y almacenarlos en caché -->
          <p class="title">
            Convivientes
          </p>
          <p class="subtitle" v-for="(conviviente, index) in convivientes" :key="index">
            {{conviviente}}
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            Los convivientes son las personas que viven contigo.
            Si uno de los que aparece aquí es menor, las personas mayores de edad pueden
            realizar una solicitud de edición de datos por el menor de edad.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';

export default {
  name: 'Profile',
  setup() {
    const { decrypt } = PMHCrypto();
    const alertErrorStorage = ref(['Se ha producido un error con su sesión, debe iniciar sesión de nuevo', 'An error has occurred with your session, you will be logged out.']);
    const lang = Cookie.get('lang') !== undefined ? Cookie.get('lang') : 0;
    const convivientes = JSON.parse(localStorage.getItem('CONV'));

    const lsSession = decrypt(localStorage.getItem('PMHSESSION'), localStorage.getItem('SALT'));
    const cookieSession = decrypt(Cookie.get('PMHSESSION'), Cookie.get('SALT'));
    if (lsSession !== cookieSession) {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }

    const rol = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT'));
    if (rol !== 'HABITANTE') {
      window.location.href = '/';
    }
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let user;
    let image;
    let nombre;
    let apellidos;
    try {
      user = JSON.parse(localStorage.getItem('USER_PRO'));
      image = user.image;
      nombre = user.nombre;
      /* eslint-disable */
      apellidos = computed(() => `${user.primerApellido} ${user.segundoApellido}`);
      /* eslint-enable */
    } catch {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }
    return {
      user,
      image,
      nombre,
      apellidos,
      convivientes,
      isMobile,
      alertErrorStorage,
      lang,
    };
  },
};
</script>

<style scoped>

</style>
