/** @format */

export const globalVar = (): void => {
  // 将Promise抛出为全局对象
  window.Promise = Promise
}

export default {
  globalVar,
}
