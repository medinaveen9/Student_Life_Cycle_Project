const CryptoJS = require("crypto-js");

const SECRET_KEY = "NIMS@2026";
// Better for production:
// const SECRET_KEY = process.env.ENCRYPTION_KEY;

const encrypt = (value) => {
  if (value === null || value === undefined) return null;

  return CryptoJS.AES.encrypt(
    String(value),
    SECRET_KEY
  ).toString();
};

const decrypt = (encryptedValue) => {
  if (!encryptedValue) return "";

  return CryptoJS.AES.decrypt(
    encryptedValue,
    SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encrypt,
  decrypt,
};