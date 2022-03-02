import { FunctionArguments, FunctionReturnValueType } from "../types/extension";

export default class DelayedFunctionCall<F extends Function> {
  private queue: [
    unknown,
    FunctionArguments<F>,
    (
      value:
        | FunctionReturnValueType<F>
        | PromiseLike<FunctionReturnValueType<F>>
    ) => void,
    (reason?: any) => void
  ][] = [];
  private f?: F;

  public setImpl = (f: F): void => {
    this.f = f;
    for (const [ctx, args, resolve, reject] of this.queue) {
      try {
        resolve(f.apply(ctx, args));
      } catch (err) {
        reject(err);
      }
    }
    this.queue = [];
  };

  public getImpl = (): F | void => {
    return this.f;
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
    if (this.f) {
      return this.f.apply(ctx, args);
    }

    return new Promise((resolve, reject) => {
      this.queue.push([ctx, args, resolve, reject]);
    });
  };
}
