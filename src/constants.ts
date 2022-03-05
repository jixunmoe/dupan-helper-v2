export const CHUNK_EARLY_HOOK = "home";
export const CHUNK_MAIN = "chunk-vendors";
export const ENTRY_ID = "jixun: entry :D";
export const MAIN_ID = "jixun: main :D";
export const __default = "a";

// module name
export enum WEBPACK_MODULE_ID {
  RegisterComponent = "0083", // `@vitejs/plugin-vue` SFC 转换的代码
  Globals = "49fe", // 一些常数以及一些预先定义好的请求代码函数
  Vue = "7231", // Search for: "Vue.js v2.6.14"
  PolyfillMakeClass = "1586", // class 语法的 Polyfill 胶水
}

// require.x keys
export enum WEBPACK_REQUIRE_KEYS {
  CACHED_MODULES = "c",
  EXPORT_ES6_MEMBER = "d",
}

// module keys
export enum WEBPACK_MODULE_KEYS {
  MODULE_ID = "i",
  MODULE_LOADED = "l",
  EXPORTS = "exports",
}

export const EVENTS = {
  SHOW_CODE_UPLOAD_DIALOG: Symbol("SHOW_CODE_UPLOAD_DIALOG"),
  ADD_RAPID_UPLOAD_TASKS: Symbol("ADD_RAPID_UPLOAD_TASKS"),
};
