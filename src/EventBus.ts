export class EventBus {
  handler = new Map<string, Set<Function>>();

  on(name: string, callback: Function) {
    if (this.handler.has(name)) {
      this.handler.get(name)?.add(callback);
    } else {
      this.handler.set(name, new Set([callback]));
    }
  }
  off(name: string, callback?: Function) {
    if (!callback) {
      this.handler.delete(name);
    } else if (this.handler.has(name)) {
      this.handler.get(name)?.delete(callback);
    }
  }
  emit(name: string, data: any = {}) {
    const handlers = this.handler.get(name);
    if (handlers) {
      for (const callback of handlers) {
        callback(data);
      }
    }
  }
}

export const bus = new EventBus();
