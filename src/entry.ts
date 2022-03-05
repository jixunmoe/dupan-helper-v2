import "./global.css";

import {
  WEBPACK_MODULE_ID,
  ENTRY_ID,
  CHUNK_EARLY_HOOK,
  __default,
  WEBPACK_MODULE_KEYS,
} from "./constants";
import "./events";
import { waitModuleLoad, setWebpackRequire } from "./hooks/hookRequire";
import { Vue as VueModule, VueShimType } from "./external/vue";
import { hookComponentInit } from "./hooks/initHooks";
import { registerComponents } from "./components";
import { hookModuleDefaultExport } from "./hooks/webpackHooks";
import { byKey, ClassItem, hookMakeClass } from "./hooks/hookMakeClass";
import { BaiduContext, baiduContext, baiduGlobals } from "./external/baidu";
import { WebpackModule, WebpackModuleExport, WebpackRequire } from "./webpack";
import { debug } from "./utils/log";

waitModuleLoad.call(WEBPACK_MODULE_ID.Vue, (module, require) => {
  debug("Vue loaded");
  const Vue = module[WEBPACK_MODULE_KEYS.EXPORTS].default as VueShimType;
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
  (originalRegisterComponent) => {
    debug("RegisterComponent hooked");
    return hookComponentInit(originalRegisterComponent);
  }
);

waitModuleLoad.call(WEBPACK_MODULE_ID.Globals, (module, require) => {
  const globals = module[WEBPACK_MODULE_KEYS.EXPORTS] as any;
  baiduGlobals.setValue(globals);
  debug("baiduGlobals init ok", globals);
});

hookMakeClass((makeClass, ctr, p, s) => {
  if (Array.isArray(p)) {
    try {
      if (p.some(byKey("_sendFileInChunkStyle"))) {
        const getInstanceMethod = <ClassItem<(ctx: BaiduContext) => void>>(
          s.find(byKey("getInstance"))
        );
        const getInstance = getInstanceMethod.value;
        getInstanceMethod.value = (ctx) => {
          debug("baiduContext init ok", ctx);
          baiduContext.setValue(ctx);
          return getInstance(ctx);
        };
        debug("class hooked w/ _sendFileInChunkStyle");
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
      debug("Entry loaded");
      setWebpackRequire(require);
    },
  },
  [[ENTRY_ID, CHUNK_EARLY_HOOK]],
]);
