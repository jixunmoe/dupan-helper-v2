import {
  WEBPACK_MODULE_KEYS,
  __default,
  WEBPACK_REQUIRE_KEYS,
} from "../constants";
import { WebpackModule, WebpackRequire } from "../webpack";
import DelayedFunctionCall from "./delayedFunctionCall";

type WaitModuleLoadCB = (
  module: WebpackModule,
  require: WebpackRequire
) => void;
type WaitModuleLoadType = (module: string, callback: WaitModuleLoadCB) => void;

export const webpackRequire = new DelayedFunctionCall<WebpackRequire>();
export const waitModuleLoad = new DelayedFunctionCall<WaitModuleLoadType>();

export function hookOnSet<T, K extends keyof T>(
  obj: T,
  name: K,
  callback: (value: T[K]) => void
) {
  let value: T[K] = obj[name];
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: true,
    get() {
      return value;
    },
    set(v) {
      if (v !== value) {
        callback(v);
        value = v;
      }
    },
  });
}

export function setWebpackRequire(require: WebpackRequire) {
  // DEBUG
  (window as any).__require = require;
  webpackRequire.setImpl(require);

  waitModuleLoad.setImpl((moduleId: string, callback: WaitModuleLoadCB) => {
    hookOnSet(
      require[WEBPACK_REQUIRE_KEYS.CACHED_MODULES],
      moduleId,
      (module) => {
        hookOnSet(module, WEBPACK_MODULE_KEYS.MODULE_LOADED, (loaded) => {
          if (loaded) {
            callback(module, require);
          }
        });
      }
    );
  });
}
