//生成随机十六进制颜色
const randomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

//生成 rgb 颜色字符串
const randomRgbColor = () =>
  `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;

//下划线转驼峰
const toHump = (str) =>
  str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());

//驼峰转下划线
const toLine = (str) => str.replace(/([A-Z])/g, "_$1").toLowerCase();

//检查字符串是否是十六进制颜色
const isHexColor = (color) =>
  /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);

//RGB 字符串转十六进制字符串
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

//两个日期之间相差的天数
const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

//检查日期是否有效
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

//检测代码是否处于 Node.js 环境
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

//检测代码是否处于浏览器环境
const isBrowser = typeof window === "object" && typeof document === "object";

//数组重排序
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

//复制到剪切板
const copyToClipboard = (text) =>
  navigator.clipboard &&
  navigator.clipboard.writeText &&
  navigator.clipboard.writeText(text);

//检测暗色主题
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

//元素滚动到顶部
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });

//滚动到底部
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

//检测设备
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";

//隐藏元素
const hideElement = (el, removeFromFlow = false) => {
  removeFromFlow
    ? (el.style.display = "none")
    : (el.style.visibility = "hidden");
};

//从 URL 中获取参数
const getParamByUrl = (key) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};

//等待函数
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const asyncFn = async () => {
  await wait(1000);
  console.log("等待异步函数执行结束");
};

//检测某个元素是否聚焦
const hasFocus = (el) => el === document.activeElement;

//获取某个元素所有的兄弟元素
const element = (el) =>
  [].slice.call(el.parentNode.children).filter((child) => child !== el);

//获取当前选择的文本
const getSelectedText = () => window.getSelection().toString();

// 返回上一个页面
const goBack = () => history.go(-1);

//获取所有 cookie 并转为对象
const getCookies = () =>
  document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});

//清除所有 cookie
const clearCookies = () =>
  document.cookie
    .split(";")
    .forEach(
      (c) =>
        (document.cookie = c
          .splace(/^+/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`))
    );

//将 URL 参数转换为对象
const getUrlParams = (query) =>
  Array.from(new URLSearchParams(query)).reduce(
    (p, [k, v]) =>
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v,
      }),
    {}
  );

//将数组转为对象
const arrayToObject = (arr, key) =>
  arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});

module.exports = {
  randomHexColor,
  randomRgbColor,
  toHump,
  toLine,
  isHexColor,
  rgbToHex,
  diffDays,
  isDateValid,
  isNode,
  isBrowser,
  shuffle,
  copyToClipboard,
  isDarkMode,
  scrollToTop,
  scrollToBottom,
  detectDeviceType,
  hideElement,
  getParamByUrl,
  asyncFn,
  hasFocus,
  element,
  getSelectedText,
  goBack,
  getCookies,
  clearCookies,
  getUrlParams,
  arrayToObject,
};
