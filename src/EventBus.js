export class EventBus {
  constructor() {
    this.handler = new Map();
  }

  on(name, callback) {
    if (this.handler.has(name)) {
      this.handler.get(name).add(callback);
    } else {
      this.handler.set(name, new Set([callback]));
    }
  }
  off(name, callback = null) {
    if (!callback) {
      this.handler.delete(name);
    } else if (this.handler.has(name)) {
      this.handler.get(name).delete(callback);
    }
  }
  emit(name, data = {}) {
    if (this.handler.has(name)) {
      for (const callback of this.handler.get(name)) {
        callback(data);
      }
    }
  }
}

export const bus = new EventBus();
