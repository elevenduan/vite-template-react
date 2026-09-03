import JSEncrypt from "jsencrypt";
import { cbc } from "@noble/ciphers/aes.js";
import { bytesToHex, hexToBytes, utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils.js";
import { md5 } from "@noble/hashes/legacy.js";

// AES
const AES_KEY = utf8ToBytes("12345678901234567890123456789012"); // 32 字节 (AES-256)
const AES_IV = utf8ToBytes("1234567890123456"); // 16 字节
const aes = cbc(AES_KEY, AES_IV);

export function encryptAES(str: string) {
  const encodedBytes = utf8ToBytes(str);
  const cipherBytes = aes.encrypt(encodedBytes);
  const hexString = bytesToHex(cipherBytes);
  return hexString.toUpperCase();
}

export function decryptAES(str: string) {
  const cipherBytes = hexToBytes(str);
  const encodedBytes = aes.decrypt(cipherBytes);
  const text = bytesToUtf8(encodedBytes);
  return text;
}

// MD5
export function getMD5(str: string) {
  const encodedBytes = utf8ToBytes(str);
  const digestBytes = md5(encodedBytes);
  const hexString = bytesToHex(digestBytes);
  return hexString.toUpperCase();
}

// RSA
const rsaPublicKey = "rsaPublicKey";
const rsaCrypt = new JSEncrypt();
rsaCrypt.setPublicKey(rsaPublicKey);

export function encryptRSA(str: string) {
  const base64Str = rsaCrypt.encrypt(str);
  return base64Str || "";
}
