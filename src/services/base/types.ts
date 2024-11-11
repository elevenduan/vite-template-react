import { AxiosRequestConfig } from "axios";

export type Response<D> = Promise<{
  code: string;
  message: string;
  data: D;
}>;

export type RequestConfig = AxiosRequestConfig;
