import { generateGet, generatePost } from "../base";

export const apiUserLogin = generateGet<API.ReqUserLogin, API.ResUserLogin>(
  "/api/login",
);

export const apiUserAccount = generatePost<
  API.ReqUserAccount,
  API.ResUserAccount
>("/api/account");
