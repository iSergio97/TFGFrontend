import CryptoJS from 'crypto-js';

/* eslint-disable */
export const PMHCrypto = () => {
  const encrypt = (body, salt) => {
    return CryptoJS.AES.encrypt(body, salt).toString();
  }
  const decrypt = (body, salt) => {
    return CryptoJS.AES.decrypt(body, salt).toString(CryptoJS.enc.Utf8);
  }

  return {
    encrypt,
    decrypt,
  }
};
