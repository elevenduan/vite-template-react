import { get, post } from "../base";

export const apiUserLogin = get<API.ReqUserLogin, API.ResUserLogin>("/api/login");

export const apiUserAccount = post<API.ReqUserAccount, API.ResUserAccount>("/api/account");
