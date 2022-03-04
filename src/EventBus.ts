export class EventBus {
  handler = new Map<string | Symbol, Set<Function>>();

  on(name: string | Symbol, callback: Function) {
    if (this.handler.has(name)) {
      this.handler.get(name)?.add(callback);
    } else {
      this.handler.set(name, new Set([callback]));
    }
  }
  off(name: string | Symbol, callback?: Function) {
    if (!callback) {
      this.handler.delete(name);
    } else if (this.handler.has(name)) {
      this.handler.get(name)?.delete(callback);
    }
  }
  emit(name: string | Symbol, ...data: any[]) {
    const handlers = this.handler.get(name);
    if (handlers) {
      for (const callback of handlers) {
        callback.apply(null, data);
      }
    }
  }
}

export const bus = new EventBus();
