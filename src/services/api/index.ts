import { genGet, genPost } from "../base";

export const apiUserLogin = genGet<API.ReqUserLogin, API.ResUserLogin>(
  "/api/login"
);

export const apiUserAccount = genPost<API.ReqUserAccount, API.ResUserAccount>(
  "/api/account"
);
