import CryptoJS from "crypto-js";

const SECRET_KEY = "NIMS@2026";
// Better for production:
// const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export const encrypt = (value) => {
  if (value === null || value === undefined) return null;

  return CryptoJS.AES.encrypt(
    String(value),
    SECRET_KEY
  ).toString();
};

export const decrypt = (encryptedValue) => {
  if (!encryptedValue) return "";

  return CryptoJS.AES.decrypt(
    encryptedValue,
    SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};