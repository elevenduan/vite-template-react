import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { merge } from "@/utils";

export type Response<D> = {
  rspCode: string;
  rspMsg: string;
  data: D;
};

const { VITE_API_URL, PROD } = import.meta.env;

const defaultConfig = {
  baseURL: PROD ? VITE_API_URL : undefined,
  headers: { "Content-Type": "application/json" }, // application/x-www-form-urlencoded // multipart/form-data
};

export function request(config: AxiosRequestConfig) {
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
      if (["00", "0000"].includes(data.code)) {
        return data;
      }
      // download
      if (res.config.responseType === "blob") {
        return res;
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

const handleDownloadRes = (res: AxiosResponse) => {
  const blob = new Blob([res.data]);
  const fileUrl = window.URL.createObjectURL(blob);
  const fileName = res.headers["content-disposition"]?.split("filename=")?.[1] || "filename";
  return { fileUrl, fileName, blob };
};

const gen =
  <P, D>(url: string, method: string, cfg?: AxiosRequestConfig, handle?: (res: AxiosResponse) => any) =>
  (params: P, config?: AxiosRequestConfig): Promise<D extends Blob ? D : Response<D>> =>
    request(merge(merge({ url, method, params }, cfg), config)).then((res) => {
      if (handle) return handle(res);
      return res;
    });

export const get = <P, D>(url: string) => gen<P, D>(url, "get");

export const post = <P, D>(url: string) => gen<P, D>(url, "post");

// export
export const exp = <P, D>(url: string) =>
  gen<P, D>(url, "post", { responseType: "blob" }, (res) => {
    const { fileUrl, fileName, blob } = handleDownloadRes(res);

    // create link
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // delete link
    URL.revokeObjectURL(fileUrl);
    document.body.removeChild(link);

    return blob;
  });

// upload
export const up = <P, D>(url: string) => gen<P, D>(url, "post", { headers: { "Content-Type": "multipart/form-data" } });

// download
export const down = <P, D>(url: string) =>
  gen<P, D>(url, "post", { responseType: "blob" }, (res) => {
    const data = handleDownloadRes(res);
    return { data };
  });
