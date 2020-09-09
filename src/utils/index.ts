/** @format */

export const globalVar = (): void => {
  // 将Promise抛出为全局对象
  window.Promise = Promise
}

// reducer生成器
export const cr = (initialState: any, handlers: commonTypes.obj) => {
  return function reducer(state = initialState, action: storeTypes.action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
