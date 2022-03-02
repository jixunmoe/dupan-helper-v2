export default class DelayedValue<T> {
  private queue: [
    (value: T | PromiseLike<T>) => void,
    (reason?: any) => void
  ][] = [];
  private value?: T;

  public setValue = (value: T): void => {
    this.value = value;
    for (const [resolve, reject] of this.queue) {
      try {
        resolve(value);
      } catch (err) {
        reject(err);
      }
    }
    this.queue = [];
  };

  public getValue = (): T | void => {
    return this.value;
  };

  public get = (callback: (value: T) => void) => {
    this.queue.push([
      callback,
      (err) => {
        console.error("could not get value: ", err);
      },
    ]);
  };

  public getAsync = async (): Promise<T> => {
    if (this.value !== undefined) {
      return this.value;
    }

    return new Promise((resolve, reject) => {
      this.queue.push([resolve, reject]);
    });
  };
}
