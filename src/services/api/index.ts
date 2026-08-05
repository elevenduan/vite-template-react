import { create } from "../base";

export const apiUserLogin = create<API.ReqUserLogin, API.ResUserLogin>("/api/login", "get");

export const apiUserAccount = create<API.ReqUserAccount, API.ResUserAccount>("/api/account", "post");
