const {
  M: MODULE_IDS,
  ENTRY_ID,
  CHUNK_EARLY_HOOK,
  R: REQUIRE,
  MK: MODULE_KEYS,
  __default,
} = require("./constants");
const { waitModuleLoad, setWebpackRequire } = require("./utils/hookRequire");
const { registerVue } = require("./external/vue");
const { hookComponentInit } = require("./utils/initHooks");
const { registerComponents } = require("./components");

waitModuleLoad(MODULE_IDS.Vue, (module) => {
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
