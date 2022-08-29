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
            <div class='column is-6-tablet is-4-mobile has-text-centered'>
              <div class="card">
                <div class="card-content">
                  <p class="subtitle">
                    Cambiar nombre de usuario
                  </p>
                  <form @submit.prevent="submitForm">
                    <div class="field">
                      <label>Nombre de usuario</label>
                      <div class="control">
                        <input
                          class="input is-rounded"
                          type="text"
                          placeholder="Nombre de usuario"
                          v-model="username">
                      </div>
                    </div>
                    <div class="field">
                      <label>Contraseña</label>
                      <div class="control">
                        <input
                          class="input is-rounded"
                          type="password"
                          placeholder="Contraseña"
                          v-model="password">
                      </div>
                    </div>
                    <div class="field">
                      <label>Nueva contraseña</label>
                      <div class="control">
                        <input
                          class="input is-rounded"
                          type="password"
                          placeholder="Confirmar contraseña"
                          v-model="newPassword">
                      </div>
                    </div>
                    <div class="field">
                      <label>Confirmar nueva contraseña</label>
                      <div class="control">
                        <input
                          class="input is-rounded"
                          type="password"
                          placeholder="Confirmar contraseña"
                          v-model="confirmNewPassword">
                      </div>
                    </div>
                    <br>
                    <div>
                      <button
                        :class="[submitted ?
                    'button is-medium is-info is-rounded is-loading' :
                    'button is-medium is-info is-rounded']">
                        Enviar <i class="fa fa-sign-in" aria-hidden="true"></i>
                      </button>
                    </div>
                  </form>
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
      <ConvivientesCard :convivientes="convivientes"/>
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
import { UserAccount } from '@/api/UserAccount';
import Swal from 'sweetalert2';

export default {
  name: 'UserProfile',
  components: {
    WebHeaderCard,
    ConvivientesCard,
    MobileHeaderCard,
  },
  setup() {
    const { decrypt } = PMHCrypto();
    const alertErrorStorage = ref(['Se ha producido un error con su sesión, debe iniciar sesión de nuevo', 'An error has occurred with your session, you will be logged out.']);
    const lang = Cookie.get('lang') !== undefined ? Cookie.get('lang') : 0;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let user;
    let image;
    let nombre;
    let apellidos;
    let address;
    let birthDate;
    let tarjetaIdentificacion;
    let email;
    const submitted = ref(false);
    let username;
    let password;
    let newPassword;
    let confirmNewPassword;
    let submitForm;
    const formSubmittedOK = ref(false);
    try {
      user = JSON.parse(decrypt(localStorage.getItem('USER_PRO'), localStorage.getItem('SALT')));
      image = new URL(user.image);
      nombre = user.nombre;
      /* eslint-disable */
      apellidos = computed(() => `${user.primerApellido} ${user.segundoApellido}`);
      /* eslint-enable */
      address = user.hoja !== undefined ? `${user.hoja.numeracion.calle.tipo} ${user.hoja.numeracion.calle.nombre} Nº ${user.hoja.numeracion.numero}` : 'Actualmente no tiene asignado ninguna vivienda';
      const fechaNacimiento = new Date(user.fechaNacimiento);
      birthDate = `${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}`;
      if (user.identificacion === null) {
        tarjetaIdentificacion = 'Esta persona no tiene ninguna identificación asociada';
      } else {
        tarjetaIdentificacion = user.tarjetaIdentificacion.codigoTarjeta === 0 ? 'Identificación correspondiente con un menor de edad' : user.identificacion;
      }
      email = user.email;
      username = ref(user.cuentaUsuario.username);
      password = ref('');
      newPassword = ref('');
      confirmNewPassword = ref('');
      submitForm = async () => {
        if (newPassword.value !== confirmNewPassword.value) {
          alert('Ambas contraseñas nuevas deben coincidir');
          return;
        }
        const { status } = await UserAccount({
          id: user.cuentaUsuario.id,
          newUsername: username.value,
          currentPassword: password.value,
          newPassword: newPassword.value,
        });
        if (status.value === 200) {
          await Swal.fire('¡Petición realizada con éxito!', 'Se va a proceder a cerrar su sesión', 'success')
            .then(() => {
              Cookie.remove('PMHSESSION');
              Cookie.remove('SALT');
              localStorage.clear();
              window.location.href = '/';
            });
        } else if (status.value === 370 || status.value === 380 || status.value === 390) {
          await Swal.fire('¡Se ha producido un error!', 'El nombre de usuario está en uso o la contraseña actual no es correcta.', 'error');
        } else {
          await Swal.fire('¡Se ha producido un error!', 'Inténtelo de nuevo más tarde. <br> Sentimos el inconveniente', 'error');
        }
      };
    } catch (e) {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }
    return {
      submitted,
      username,
      password,
      newPassword,
      confirmNewPassword,
      submitForm,
      user,
      image,
      nombre,
      apellidos,
      address,
      birthDate,
      tarjetaIdentificacion,
      email,
      isMobile,
      alertErrorStorage,
      lang,
      formSubmittedOK,
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

input {
  width: 70%;
  text-align: center;
}
</style>
