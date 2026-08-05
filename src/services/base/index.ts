import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { merge } from "../../utils";
import { Toast } from "antd-mobile";

export type Response<D> = {
  code: string;
  message: string;
  data: D;
};

const { VITE_API_URL, PROD } = import.meta.env;

const defaultConfig = {
  baseURL: PROD ? VITE_API_URL : undefined,
  headers: { "Content-Type": "application/json" }, // application/x-www-form-urlencoded // multipart/form-data
};

export const request = (cfg: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = merge(defaultConfig, cfg as any);

  // 参数名称
  if (config.method?.toLowerCase() === "get") {
    config.params = config.data;
    config.data = undefined;
  }

  return axios(config)
    .then((res) => {
      // download
      if (res.config.responseType === "blob") {
        return res;
      }

      const data = res.data;
      const { code, message } = data;

      // success
      if (["00", "0000"].includes(code)) {
        return data;
      }

      // token过期
      if (["4030"].includes(code)) {
        // logout();
      }

      // error
      Toast.show(message);
      return Promise.reject(res);
    })
    .catch((err) => {
      const res = err?.response || err;
      const data = res.data;

      // 网络请求异常，而非code码代表的服务处理失败
      if (res?.status !== 200) {
        Toast.show("网络请求异常");
      }

      return Promise.reject(data);
    });
};

export const create =
  <P, D>(url: string, method: string, cfg1: AxiosRequestConfig = {}) =>
  (params: P, cfg2: AxiosRequestConfig = {}): Promise<D extends Blob ? D : Response<D>> =>
    request(merge({ url, method, data: params }, cfg1 as any, cfg2 as any));
