<template>
  <div v-if="!isMobile">
    <div class="container">
      <WebHeaderCard
        :image="image"
        :nombre="nombre"
        :apellidos="apellidos"
        :address="address"
        :birth-date="birthDate"
        :email="email"
        :tarjetaIdentificacion="tarjetaIdentificacion"
      />
    </div>
    <div class='columns'>
      <div class='container profile'>
        <div class='section profile-heading'>
          <div class='columns is-mobile is-multiline'>
            <ConvivientesCard :convivientes="convivientes"/>
            <div class='column is-6-tablet is-4-mobile has-text-centered'>
              <div class="card">
                <div class="card-content">
                  <p class="title">
                    Formulario para cambiar datos de login
                  </p>
                  <p> Introducir form </p>
                </div>
                <footer class="card-footer">
                  <p class="card-footer-item">
                    Su sesión se cerrará para verirficar el cambio de datos de usuario
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
      <MobileHeaderCard
        :image="image"
        :nombre="nombre"
        :apellidos="apellidos"
        :address="address"
        :birth-date="birthDate"
        :email="email"
        :tarjetaIdentificacion="tarjetaIdentificacion"
        />
      <ConvivientesCard :convivientes="convivientes" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { PMHCrypto } from '@/methods/PMHCrypto';
import Cookie from 'js-cookie';
import WebHeaderCard from '@/components/profile/WebHeaderCard.vue';
import ConvivientesCard from '@/components/profile/ConvivientesCard.vue';
import MobileHeaderCard from '@/components/profile/MobileHeaderCard.vue';

export default {
  name: 'Profile',
  components: {
    WebHeaderCard,
    ConvivientesCard,
    MobileHeaderCard,
  },
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
    let address;
    let birthDate;
    let tarjetaIdentificacion;
    let email;
    try {
      user = JSON.parse(localStorage.getItem('USER_PRO'));
      image = user.image;
      nombre = user.nombre;
      /* eslint-disable */
      apellidos = computed(() => `${user.primerApellido} ${user.segundoApellido}`);
      /* eslint-enable */
      address = `${user.vivienda.calle} Nº ${user.vivienda.numero}`;
      const fechaNacimiento = new Date(user.fechaNacimiento);
      birthDate = `${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}`;
      tarjetaIdentificacion = user.tarjetaIdentificacion.codigoTarjeta === 0 ? 'Identificación correspondiente con un menor de edad' : user.identificacion;
      email = user.email;
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
      address,
      birthDate,
      tarjetaIdentificacion,
      email,
      convivientes,
      isMobile,
      alertErrorStorage,
      lang,
    };
  },
};
</script>

<style scoped>
body {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.card.is-horizontal {
  display: flex;
}
.card.is-horizontal .card-image {
  width: 100%;
  height: 100%;
}
.card.is-horizontal .card-stacked {
  flex-direction: column;
  flex: 1 1 auto;
  display: flex;
  position: relative;
}
.card.is-horizontal .card-stacked .card-content {
  flex-grow: 1;
}
.card.is-fullimage {
  background-color: transparent;
}
.card.is-fullimage .card-image {
  color: #fff !important;
}
.card.is-fullimage .card-image .card-stacked {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%);
  text-shadow: 0px 0px 2px #000000;
}
.card.is-fullimage .card-image .card-stacked .card-footer {
  border-color: transparent;
}
.card.is-fullimage .card-image .card-stacked .title,
.card.is-fullimage .card-image .card-stacked .subtitle {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a {
  color: inherit;
}
.card.is-fullimage .card-image .card-stacked a:hover {
  text-decoration: underline;
}
</style>
