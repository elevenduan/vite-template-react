import type { NavigateFunction } from "react-router";
import qs from "qs";

// navigate
export let navigate: NavigateFunction;
export const initGlobalNavigate = (nav: NavigateFunction) => (navigate = nav);

// search
export const urlSearch = qs.parse(window.location.search, { ignoreQueryPrefix: true });

// 是否数字或者字符串数字
export function isNum(val: any) {
  return Number.parseFloat(val) === Number(val);
}

// 添加千分位，默认保留两位小数
export function thousandSeparator(val: string | number, fixed: number = 2) {
  if (!isNum(val)) return "";
  return Number(val)
    .toFixed(fixed)
    .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}

// 替换占位符 // start, end 同 String.prototype.slice(start, end)
export function asterisk(str: string, start?: number, end?: number, sign: string = "*") {
  const slice = str.slice(start, end);
  const replace = slice.replace(/./g, sign);
  return str.replace(slice, replace);
}

// 添加分隔符 // 默认分隔符为空格 // 默认间隔长度4 // 默认从头开始
export function separator(str: string, sign: string = " ", len: number = 4, reverse: boolean = false) {
  const reg = reverse ? `(\\S{1,${len}})(?=(\\S{${len}})+(?:$))` : `(\\S{${len}})(?=\\S)`;
  return str.replace(new RegExp(reg, "g"), "$1" + sign);
}

// 分转元
export function fenToYuan(val: string | number) {
  if (!isNum(val)) return "";
  return (Number(val) / 100).toFixed(2);
}

// 元转分
export function yuanToFen(val: string | number) {
  if (!isNum(val)) return "";
  return (Number(val) * 100).toFixed(0);
}

/** 判断值是否为可递归合并的普通对象。 */
export const isPlainObject = (value: unknown): value is Record<PropertyKey, unknown> => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

/** 深度合并多个对象或数组；数组按下标合并，后续来源会覆盖同名键或同下标的值。 */
type Mergeable = Record<PropertyKey, unknown> | unknown[];

export const merge = <T extends Mergeable>(target: T, ...sources: Mergeable[]): T => {
  const mergeValue = (current: unknown, next: unknown): unknown => {
    if (Array.isArray(current) && Array.isArray(next)) {
      const result = [...current];
      next.forEach((value, index) => {
        result[index] = mergeValue(result[index], value);
      });
      return result;
    }

    if (isPlainObject(current) && isPlainObject(next)) {
      const result: Record<PropertyKey, unknown> = { ...current };
      Reflect.ownKeys(next).forEach((key) => {
        result[key] = mergeValue(result[key], next[key]);
      });
      return result;
    }

    if (Array.isArray(next)) return next.map((value) => mergeValue(undefined, value));
    if (isPlainObject(next)) return mergeValue({}, next);
    return next;
  };

  return sources.reduce<T>((result, source) => mergeValue(result, source) as T, mergeValue(undefined, target) as T);
};
