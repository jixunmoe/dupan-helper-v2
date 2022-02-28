import "./global.css";

import {
  M as MODULE_IDS,
  ENTRY_ID,
  CHUNK_EARLY_HOOK,
  R as REQUIRE,
  MK as MODULE_KEYS,
  __default,
} from "./constants";
import { waitModuleLoad, setWebpackRequire } from "./utils/hookRequire";
import { registerVue } from "./external/vue";
import { hookComponentInit } from "./utils/initHooks";
import { registerComponents } from "./components";

waitModuleLoad(MODULE_IDS.Vue, (module, require) => {
  const Vue = module.exports.default;
  Object.defineProperty(Vue.config, "devtools", {
    get() {
      return true;
    },
    set() {},
  });
  registerVue(Vue);
  registerComponents(require);
});

waitModuleLoad(MODULE_IDS.RegisterComponent, (module, require) => {
  const RegisterComponentModule = module[MODULE_KEYS.exports];
  const originalRegisterComponent = RegisterComponentModule[__default];
  const newExports = (module[MODULE_KEYS.exports] = {});
  const hookedComponentInit = hookComponentInit(originalRegisterComponent);
  require[REQUIRE.esExportMember](
    newExports,
    __default,
    () => hookedComponentInit
  );
});

(window.webpackJsonp = window.webpackJsonp || []).push([
  [
    /* 新百度网盘 */
  ],
  {
    [ENTRY_ID]: function (module, exports, require) {
      setWebpackRequire(require);
    },
  },
  [[ENTRY_ID, CHUNK_EARLY_HOOK]],
]);
