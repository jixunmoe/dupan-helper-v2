import { WEBPACK_MODULE_ID } from "../constants";
import { FunctionArguments, FunctionReturnValueType } from "../types/extension";
import { hookModuleDefaultExport } from "./webpackHooks";

export interface ClassItem<T = unknown> {
  key: string;
  value: T;
}

type MakeClassFn = (ctr: () => void, p: ClassItem[], s: ClassItem[]) => unknown;

type MakeClassCallback = (
  makeClass: MakeClassFn,
  ...args: FunctionArguments<MakeClassFn>
) => FunctionReturnValueType<MakeClassFn>;

export const byKey = (key: string) => (item: { key: string }) => {
  return key === item.key;
};

export function hookMakeClass(callback: MakeClassCallback) {
  hookModuleDefaultExport<MakeClassFn>(
    WEBPACK_MODULE_ID.PolyfillMakeClass,
    (makeClass) => (ctr, p, s) => {
      return callback(makeClass, ctr, p, s);
    }
  );
}
