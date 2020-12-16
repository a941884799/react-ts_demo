/**
 * @Descripttion: redux 模块 的reducer生成器
 * @param {any} initialState 初始值
 * @param {any} handlers 处理器，处理action
 * @return {reducer} 返回一个 reducer 函数
 */
export function cr(initialState: unknown, handlers: Record<string, Store.Reducer>): Store.Reducer {
  return function reducer(state = initialState, action: Store.Action): unknown {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
