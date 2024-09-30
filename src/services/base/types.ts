import { AxiosRequestConfig } from "axios";

export type Response<T> = Promise<{
  code: string;
  message: string;
  data: T;
}>;

export type RequestConfig = AxiosRequestConfig;
