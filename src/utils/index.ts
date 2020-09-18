/** @format */

export const globalVar = (): void => {
  // 将Promise抛出为全局对象
  window.Promise = Promise
}

// reducer生成器
export const cr = (initialState: any, handlers: globalTypes.obj) => {
  return function reducer(state = initialState, action: storeTypes.action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
