type CallbackSig<T> = (value: T) => void;
type GetInPromiseSig<T> = () => Promise<T>;
type GetInCallbackSig<T> = (callback: CallbackSig<T>) => void;
type GetValueSig<T> = GetInPromiseSig<T> & GetInCallbackSig<T>;
export default class DelayedValue<T> {
  private queue: CallbackSig<T>[] = [];
  private value?: T;

  public setValue = (value: T): void => {
    this.value = value;
    for (const resolve of this.queue) {
      resolve(value);
    }
    this.queue = [];
  };

  public getValue = (): T | void => {
    return this.value;
  };

  public get isSet(): boolean {
    return this.value !== undefined;
  }

  public get = ((callback?: CallbackSig<T>) => {
    if (this.value !== undefined) {
      if (callback) {
        return callback(this.value);
      } else {
        return Promise.resolve(this.value);
      }
    }

    if (callback) {
      this.queue.push(callback);
    } else {
      return new Promise((resolve) => {
        this.queue.push(resolve);
      });
    }
  }) as GetValueSig<T>;

  public getAsync = async (): Promise<T> => {
    return new Promise((resolve) => {
      this.get(resolve);
    });
  };
}
