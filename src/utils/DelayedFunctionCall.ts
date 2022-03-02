import { FunctionArguments, FunctionReturnValueType } from "../types/extension";
import DelayedValue from "./DelayedValue";

export default class DelayedFunctionCall<F extends Function> {
  private value = new DelayedValue<F>();

  public setImpl = (f: F): void => {
    this.value.setValue(f);
  };

  public getImpl = (): F | void => {
    return this.value.getValue();
  };

  public call = (
    ...args: FunctionArguments<F>
  ): Promise<FunctionReturnValueType<F>> => {
    return this.callWithContext(null, ...args);
  };

  public callWithContext = (
    ctx: unknown,
    ...args: FunctionArguments<F>
  ): Promise<FunctionReturnValueType<F>> => {
    const f = this.value.getValue();
    if (f) {
      return f.apply(ctx, args);
    }

    return new Promise((resolve, reject) => {
      this.value.get((f) => {
        try {
          resolve(f.apply(ctx, args));
        } catch (err) {
          reject(err);
        }
      });
    });
  };
}
