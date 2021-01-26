<template>
  <div class='columns'>
    <div class='container profile'>
      <div class='modal' id='edit-preferences-modal'>
        <div class='modal-background'></div>
        <div class='modal-card'>
          <header class='modal-card-head'>
            <p class='modal-card-title'>Edit Preferences</p>
            <button class='delete'></button>
          </header>
          <section class='modal-card-body'>
            <label class='label'>Name</label>
            <p class='control'>
              <input class='input' placeholder='Text input' type='text'>
            </p>
            <label class='label'>Username</label>
            <p class='control has-icon has-icon-right'>
              <input class='input' placeholder='Text input' type='text' value='pmillerk'>
            </p>
            <label class='label'>Email</label>
            <p class='control has-icon has-icon-right'>
              <input class='input' placeholder='Email input' type='text' value='hello@'>
              <i class='fa fa-warning'></i>
              <span class='help is-danger'>This email is invalid</span>
            </p>
            <div class='control'>
              <div class='control-label is-pulled-left'>
                <label class='label'>Date of Birth</label>
              </div>
              <span>
              <span class='select'>
                <select>
                  <option>Month</option>
                  <option>With options</option>
                </select>
              </span>
              <span class='select'>
                <select>
                  <option>Day</option>
                  <option>With options</option>
                </select>
              </span>
              <span class='select'>
                <select>
                  <option>Year</option>
                  <option>With options</option>
                </select>
              </span>
            </span>
            </div>
            <label class='label'>Description</label>
            <p class='control'>
              <textarea class='textarea' placeholder='Describe Yourself!'></textarea>
            </p>
            <div class='content'>
              <h1>Optional Information</h1>
            </div>
            <label class='label'>Phone Number</label>
            <p class='control has-icon has-icon-right'>
              <input class='input' placeholder='Text input' type='text' value='+1 *** *** 0535'>
            </p>
            <label class='label'>Work</label>
            <p class='control has-icon has-icon-right'>
              <input class='input' placeholder='Text input' type='text'
                     value='Greater Washington Publishing'>
            </p>
            <label class='label'>School</label>
            <p class='control has-icon has-icon-right'>
              <input class='input' placeholder='Text input'
                     type='text' value='George Mason University'>
            </p>
          </section>
          <footer class='modal-card-foot'>
            <a class='button is-primary modal-save'>Save changes</a>
            <a class='button modal-cancel'>Cancel</a>
          </footer>
        </div>
      </div>
      <div class='section profile-heading'>
        <div class='columns is-mobile is-multiline'>
          <div class='column is-2'>
          <span class='header-icon user-profile-image'>
            <img alt='User profile image' :src='image'>
          </span>
          </div>
          <div class='column is-4-tablet is-10-mobile name'>
            <p>
              <span class='title is-bold'>{{fullName}}</span>
            </p>
          </div>
          <div class='column is-2-tablet is-4-mobile has-text-centered'>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
          </div>
          <div class='column is-2-tablet is-4-mobile has-text-centered'>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
            <p class='stat-val'>3</p>
            <p class='stat-key'>Cambios realizados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

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
    if (localStorage.getItem('PMHSESSION') === null || localStorage.getItem('SALT') === null || Cookie.get('PMHSESSION') === null || Cookie.get('SALT') === null) {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }

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
    let user;
    let image;
    try {
      user = JSON.parse(localStorage.getItem('USER_PRO'));
      image = user.image;
    } catch {
      alert(alertErrorStorage.value[lang]);
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      window.location.href = '/';
    }
    /* eslint-disable */
    const fullName = computed(() => `${user.nombre}, ${user.primerApellido} ${user.segundoApellido}`);
    /* eslint-enable */
    return {
      user,
      image,
      fullName,
      alertErrorStorage,
      lang,
    };
  },
};
</script>

<style scoped>

</style>
