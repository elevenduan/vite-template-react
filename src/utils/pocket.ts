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
export function asterisk(
  str: string,
  start?: number,
  end?: number,
  sign: string = "*",
) {
  const slice = str.slice(start, end);
  const replace = slice.replace(/./g, sign);
  return str.replace(slice, replace);
}

// 添加分隔符 // 默认分隔符为空格 // 默认间隔长度4 // 默认从头开始
export function separator(
  str: string,
  sign: string = " ",
  len: number = 4,
  reverse: boolean = false,
) {
  const reg = reverse
    ? `(\\S{1,${len}})(?=(\\S{${len}})+(?:$))`
    : `(\\S{${len}})(?=\\S)`;
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

// 是否键值对象
export function isObject(val: any) {
  return Object.prototype.toString.call(val) === "[object Object]";
}

// 对象合并
export function merge(target: any, source: any) {
  if (!isObject(target) || !isObject(source)) {
    return {};
  }
  const output = Object.assign({}, target);
  const extend = Object.assign({}, source);
  for (const key of Object.keys(extend)) {
    if (isObject(output[key]) && isObject(extend[key])) {
      output[key] = merge(output[key], extend[key]);
    } else {
      output[key] = extend[key];
    }
  }
  return output;
}
