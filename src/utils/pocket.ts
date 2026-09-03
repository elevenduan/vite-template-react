import type { NavigateFunction } from "react-router";
import qs from "qs";
import { isEmpty } from "@bigflower/utils";

// navigate
export let navigate: NavigateFunction;
export const initGlobalNavigate = (nav: NavigateFunction) => (navigate = nav);

// search
export const urlSearch = qs.parse(window.location.search, { ignoreQueryPrefix: true });

// 对象转字符串 // 升序
export function stringify(value: unknown, options?: qs.IStringifyOptions) {
  if (typeof value !== "object" || isEmpty(value)) return "";
  return qs.stringify(value, { sort: (a, b) => a.localeCompare(b), ...options });
}

// 字符串转对象
export function parse(param: unknown) {
  if (!param || typeof param !== "string") return {};
  return qs.parse(param, { ignoreQueryPrefix: true });
}
