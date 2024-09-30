import axios from "axios";
import type { RequestConfig } from "./types";
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
  return axios(params)
    .then((res) => {
      const data = res.data;
      // success
      if (data.code === "0000") {
        if (VITE_MOCK === "true") {
          console.log(params.url, res.data);
        }
        return res.data;
      }
      // error
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
