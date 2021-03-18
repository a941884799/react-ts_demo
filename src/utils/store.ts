import { Reducer, Handler, Action } from '@store/reducers';
/**
 * @Descripttion: redux 模块 的reducer生成器
 * @param {any} initialState 初始值
 * @param {any} handlers 处理器，处理action
 * @return {reducer} 返回一个 reducer 函数
 */
export function cr<T>(initialState: T, handlers: Handler): Reducer {
  return function reducer(state = initialState, action: Action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
