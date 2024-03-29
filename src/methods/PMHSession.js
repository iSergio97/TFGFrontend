import { ref } from 'vue';
import Cookie from 'js-cookie';
import { PMHCrypto } from '@/methods/PMHCrypto';

/* eslint-disable */
/*
Función que tiene 3 métodos
  - El primero comprueba que existe sesión
    @params
    @return 0 si no hay sesión, 1 si hay sesión de usuario y 2 si hay sesión de administrador
    @throw Devuelve excepción si los valores de las cookies no coinciden con los valores del localStorage
*/
export const PMHSession = (path) => {
  const localSession = ref(0);
  const userRolSession = ref(false);
  const adminRolSession = ref(false);
  if (localStorage.getItem('PMHSESSION') === null ||
      localStorage.getItem('USER_PRO') === null ||
      localStorage.getItem('SALT') === null ||
      localStorage.getItem('USER_ROL') === null ||
      Cookie.get('PMHSESSION') === undefined ||
      Cookie.get('SALT') === undefined) {
    if(userRolSession.value !== 'U2FsdGVkX1/SG5iHEk1ZV2oTlE7rYLFdgZne6SnuPF0=') {
      Cookie.remove('PMHSESSION');
      Cookie.remove('SALT');
      localStorage.clear();
      localSession.value = 0;
    }
  } else {
    const { decrypt } = PMHCrypto();
    const userRol = decrypt(localStorage.getItem('USER_ROL'), localStorage.getItem('SALT'));
    localSession.value = userRol === 'USER' ? 1 : 2;
  }

  userRolSession.value = (path !== 'user' && localSession.value === 1);

  adminRolSession.value = (path !== 'administrator' && localSession.value === 2);

  return {
    localSession,
    userRolSession,
    adminRolSession,
  }
};
