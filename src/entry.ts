import "./global.css";

import {
  WEBPACK_MODULE_ID,
  ENTRY_ID,
  CHUNK_EARLY_HOOK,
  __default,
} from "./constants";
import { waitModuleLoad, setWebpackRequire } from "./hooks/hookRequire";
import { Vue as VueModule, VueShimType } from "./external/vue";
import { hookComponentInit } from "./hooks/initHooks";
import { registerComponents } from "./components";
import { hookModuleDefaultExport } from "./hooks/webpackHooks";
import { byKey, ClassItem, hookMakeClass } from "./hooks/hookMakeClass";
import { BaiduContext, baiduContext } from "./external/baidu";
import { WebpackModule, WebpackModuleExport, WebpackRequire } from "./webpack";

waitModuleLoad.call(WEBPACK_MODULE_ID.Vue, (module, require) => {
  const Vue = module.exports.default as VueShimType;
  Object.defineProperty(Vue.config, "devtools", {
    get() {
      return true;
    },
    set() {},
  });
  VueModule.setValue(Vue);
  registerComponents(Vue, require);
});

hookModuleDefaultExport(
  WEBPACK_MODULE_ID.RegisterComponent,
  (originalRegisterComponent) => hookComponentInit(originalRegisterComponent)
);

hookMakeClass((makeClass, ctr, p, s) => {
  if (Array.isArray(p)) {
    try {
      if (p.some(byKey("_sendFileInChunkStyle"))) {
        const getInstanceMethod = <ClassItem<(ctx: BaiduContext) => void>>(
          s.find(byKey("getInstance"))
        );
        const getInstance = getInstanceMethod.value;
        getInstanceMethod.value = (ctx) => {
          baiduContext.setValue(ctx);
          return getInstance(ctx);
        };
      }
    } catch (err) {
      console.error("hook make class failed", err);
    }
  }

  return makeClass(ctr, p, s);
});

((window as any).webpackJsonp = (window as any).webpackJsonp || []).push([
  [
    /* 新百度网盘 */
  ],
  {
    [ENTRY_ID]: function (
      module: WebpackModule,
      exports: WebpackModuleExport,
      require: WebpackRequire
    ) {
      setWebpackRequire(require);
    },
  },
  [[ENTRY_ID, CHUNK_EARLY_HOOK]],
]);
