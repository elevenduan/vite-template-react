import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("b1941412757b6088e6ceef4b04276ee6");
const iv = CryptoJS.enc.Utf8.parse("0000000000000000");
// 'CBC' | 'CFB' | 'CTR' | 'OFB' | 'ECB'; // CBC (the default)
// 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding'; // Pkcs7 (the default)
const opt = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding, iv };

export function aes(str: string) {
  const encrypted = CryptoJS.AES.encrypt(str, key, opt);
  const hexStr = encrypted.ciphertext.toString().toUpperCase();
  return hexStr;
}

export function md5(str: string) {
  const base64Str = CryptoJS.MD5(str).toString().toUpperCase();
  return base64Str;
}
