import { MK as MODULE_KEY, R as REQUIRE } from "../constants";

export function allowReExport() {
  require[REQUIRE.esExportMember] = function (exports, name, getter, force = false) {
    if (force || !Object.prototype.hasOwnProperty.call(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
        configurable: true,
      });
    }
  };
}

function hookOnSet(obj, name, callback) {
  let value = obj[name];
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: true,
    get() {
      return value;
    },
    set(v) {
      if (v !== value) {
        value = v;
        callback(v);
      }
    },
  });
}

let webpackRealWaitRequire;
let webpackRequire;
const moduleLoadHooks = [];

export function waitModuleLoad(moduleId, callback) {
  if (webpackRealWaitRequire) {
    webpackRealWaitRequire(moduleId, callback);
  } else {
    moduleLoadHooks.push([moduleId, callback]);
  }
}

export function setWebpackRequire(require) {
  // DEBUG
  window.__require = require;
  webpackRequire = require;

  webpackRealWaitRequire = (moduleId, callback) => {
    hookOnSet(require[REQUIRE.cachedModules], moduleId, (module) => {
      hookOnSet(module, MODULE_KEY.loaded, (loaded) => {
        if (loaded) {
          callback(module, require);
        }
      });
    });
  };

  for(const [moduleId, callback] of moduleLoadHooks) {
    webpackRealWaitRequire(moduleId, callback);
  }
}

