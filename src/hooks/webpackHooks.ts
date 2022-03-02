import {
  WEBPACK_MODULE_KEYS,
  WEBPACK_REQUIRE_KEYS,
  __default,
} from "../constants";
import { WebpackModuleExport, WebpackRequire } from "../webpack";
import { waitModuleLoad } from "./hookRequire";

export function allowReExport(require: WebpackRequire): void {
  require[WEBPACK_REQUIRE_KEYS.EXPORT_ES6_MEMBER] = function (
    exports,
    name,
    getter,
    force = false
  ) {
    if (force || !Object.prototype.hasOwnProperty.call(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
        configurable: true,
      });
    }
  };
}

export function hookModuleDefaultExport<T extends Function>(
  moduleId: string,
  hookMethod: (orig: T) => T
) {
  waitModuleLoad.call(moduleId, (module, require) => {
    const originalExports = module[WEBPACK_MODULE_KEYS.EXPORTS];
    const originalDefaultExport = <T>originalExports[__default];
    const newExports = {};
    module[WEBPACK_MODULE_KEYS.EXPORTS] = newExports;

    const hookedDefaultExport = hookMethod(originalDefaultExport);
    require[WEBPACK_REQUIRE_KEYS.EXPORT_ES6_MEMBER](
      newExports,
      __default,
      () => hookedDefaultExport
    );
  });
}
