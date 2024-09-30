import { request } from "../base";
import type { Response, RequestConfig } from "../base/types";

/** 登录 GET /login */
export function userLogin(
  params: API.ReqUserLogin,
  config?: RequestConfig,
): Response<API.ResUserLogin> {
  return request({
    url: "/api/login",
    method: "get",
    params,
    ...config,
  });
}

/** 账户 POST /account */
export function userAccount(
  params: API.ReqUserAccount,
  config?: RequestConfig,
): Response<API.ResUserAccount> {
  return request({
    url: "/api/account",
    method: "post",
    data: params,
    ...config,
  });
}
