class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    };
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        try {
          fn.call(null, data);
        } catch (error) {
          console.error(`Error calling event handler for ${eventName}`, error);
        }
      });
    }
  }

  once(eventName, fn) {
    const onceWrapper = (data) => {
      fn(data);
      this.unsubscribe(eventName, onceWrapper);
    };
    this.subscribe(eventName, onceWrapper);
  }

  unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    }
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
