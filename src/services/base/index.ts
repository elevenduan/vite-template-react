import axios from "axios";
import type { Response, RequestConfig } from "@/services/base/types";
import Mock from "@/../mock";

const { VITE_API_URL, PROD, VITE_MOCK } = import.meta.env;

if (VITE_MOCK === "true") {
  Mock();
}

const defaultConfig = {
  baseURL: PROD ? VITE_API_URL : undefined,
  headers: { "Content-Type": "application/json" }, // application/x-www-form-urlencoded // multipart/form-data
};

export function request(config: RequestConfig) {
  const params = Object.assign({}, defaultConfig, config);

  // post请求参数名称
  if (params.method?.toLocaleLowerCase() === "post") {
    params.data = params.params;
    params.params = undefined;
  }

  return axios(params)
    .then((res) => {
      const data = res.data;
      // success
      if (data.code === "0000") {
        if (VITE_MOCK === "true") {
          console.log(params.url, data);
        }
        return data;
      }
      // error
      console.log(data.message);
      return Promise.reject(res);
    })
    .catch((err) => {
      const res = err?.response || err;
      const data = res.data;

      // 网络请求异常，而非code码代表的服务处理失败
      if (res?.status !== 200) {
        console.log("网络请求异常");
      }

      return Promise.reject(data);
    });
}

export const generate =
  <P, D>(url: string, method: string) =>
  (params: P, config?: RequestConfig): Response<D> =>
    request({
      url,
      method,
      params,
      ...config,
    });

export const generateGet = <P, D>(url: string) => generate<P, D>(url, "get");

export const generatePost = <P, D>(url: string) => generate<P, D>(url, "post");
