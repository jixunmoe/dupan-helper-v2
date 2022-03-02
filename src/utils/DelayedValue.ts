export default class DelayedValue<T> {
  private queue: ((value: T) => void)[] = [];
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

  public get = (callback: (value: T) => void) => {
    this.queue.push(callback);
  };

  public getAsync = async (): Promise<T> => {
    if (this.value !== undefined) {
      return this.value;
    }

    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  };
}
