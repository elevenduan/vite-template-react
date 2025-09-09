import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

// AES
const aesKey = CryptoJS.enc.Utf8.parse("aesKey");
const aesIv = CryptoJS.enc.Utf8.parse("0000000000000000");
const aesCfg = { iv: aesIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
export function aesEncrypt(str: string) {
  const encrypted = CryptoJS.AES.encrypt(str, aesKey, aesCfg);
  // const hexStr = encrypted.ciphertext.toString().toUpperCase();
  const base64Str = encrypted.toString().toUpperCase();
  return base64Str;
}
export function aesDecrypt(str: string) {
  const bytes = CryptoJS.AES.decrypt(str, aesKey, aesCfg);
  const text = bytes.toString(CryptoJS.enc.Utf8);
  return text;
}

// MD5
export function md5(str: string) {
  const base64Str = CryptoJS.MD5(str).toString().toUpperCase();
  return base64Str;
}

// RSA
const rsaPublicKey = "rsaPublicKey";
const rsaCrypt = new JSEncrypt();
rsaCrypt.setPublicKey(rsaPublicKey);
export function rsaEncrypt(str: string) {
  const base64Str = rsaCrypt.encrypt(str);
  return base64Str || "";
}
