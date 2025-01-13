import axios from "axios";
import type { Response, RequestConfig } from "@/services/base/types";

const { VITE_API_URL, PROD } = import.meta.env;

const defaultConfig = {
  baseURL: PROD ? VITE_API_URL : undefined,
  headers: { "Content-Type": "application/json" } // application/x-www-form-urlencoded // multipart/form-data
};

export function request(config: RequestConfig) {
  const params = Object.assign({}, defaultConfig, config);

  // post请求参数名称
  if (params.method?.toLocaleLowerCase() === "post") {
    params.data = params.params;
    params.params = undefined;
  }

  // 添加响应拦截器
  axios.interceptors.response.use((response) => {
    // 标准化返回名称：code, message, data
    const res = response.data;
    return {
      ...response,
      data: {
        code: res.code || res.errCode,
        message: res.message || res.errMsg,
        data: res.data
      }
    };
  });

  return axios(params)
    .then((res) => {
      const data = res.data;
      // success
      if (["00", "0000"].includes(data.code)) {
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
        return;
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
      ...config
    });

export const get = <P, D>(url: string) => generate<P, D>(url, "get");

export const post = <P, D>(url: string) => generate<P, D>(url, "post");
