class EventBus {
  constructor() {
    // 创建数组存储方法
    this.eventList = {};
  }

  // 订阅
  on(name, cb) {
    if (typeof cb !== 'function') return;

    const eventList = this.eventList;

    if (!eventList[name]) {
      eventList[name] = [];
    }

    // 将传入的方法存储至对应的队列中
    eventList[name].push(cb);
  }

  // 监听并且只执行一次 之后取消订阅
  once(name, cb) {
    // 包装cb回调函数
    const _cb = (...args) => {
      // 当一次 emit 执行事件的时候，进行解绑事件操作
      const eventList = this.events[type] || [];
      this.off(name, _cb);
      // 执行一次事件函数
      eventList(...args);
    };

    this.on(name, _cb);
  }

  // 发布
  emit(name, ...args) {
    const eventList = this.eventList[name];
    if (!eventList?.length) return;
    // 触发已经存储的方法
    eventList.forEach(cb => {
      cb(...args);
    });
  }

  // 取消订阅
  off(name, cb) {
    if (typeof cb !== 'function') return;
    let eventList = this.eventList[name];
    if (!eventList?.length) return;
    // 删除传入的方法
    eventList = eventList.filter(item => item !== cb);
  }
}

export default EventBus;
