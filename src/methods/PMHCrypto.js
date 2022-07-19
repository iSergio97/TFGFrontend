import CryptoJS from "crypto-js";

/* eslint-disable */
export const PMHCrypto = () => {
  const encrypt = (body, salt) => {
    try {
      return CryptoJS.AES.encrypt(body, salt).toString();
    } catch {
      alert("Se ha producido un error.\nInténtelo de nuevo más tarde");
    }
  };
  const decrypt = (body, salt) => {
    try {
      return CryptoJS.AES.decrypt(body, salt).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      alert("Se ha producido un error con su sesión.\nSe va a proceder a cerrar la sesión");
    }
  };

  return {
    encrypt,
    decrypt,
  };
};
