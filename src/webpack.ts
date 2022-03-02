import { WEBPACK_MODULE_KEYS, WEBPACK_REQUIRE_KEYS } from "./constants";

export type WebpackModuleExport = Record<string, never>;

export interface WebpackModule {
  [WEBPACK_MODULE_KEYS.MODULE_ID]: string;
  [WEBPACK_MODULE_KEYS.MODULE_LOADED]: boolean;

  [WEBPACK_MODULE_KEYS.EXPORTS]: WebpackModuleExport;
}

export interface WebpackRequire {
  <T = never>(module: string): T;

  [WEBPACK_REQUIRE_KEYS.CACHED_MODULES]: Record<string, WebpackModule>;
  [WEBPACK_REQUIRE_KEYS.EXPORT_ES6_MEMBER]<T>(
    exports: WebpackModuleExport,
    key: string,
    getter: () => T,
    force?: boolean
  ): void;
}
