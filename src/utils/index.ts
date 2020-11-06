/** @format */

/**
 * @Descripttion: 注册全局变量，解决按需引入polyfill的缺陷
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param
 * @return
 */
export const globalVar = (): void => {
	// 将Promise抛出为全局对象
	window.Promise = Promise;
};

/**
 * @Descripttion: redux 模块 的reducer生成器
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {any} initialState 初始值
 * @param {any} handlers 处理器，处理action
 * @return {reducer} 返回一个 reducer 函数
 */
export const cr = (initialState: unknown, handlers: Record<string, Store.Reducer>): Store.Reducer =>
	function reducer(state = initialState, action: Store.Action): unknown {
		if (handlers[action.type]) {
			return handlers[action.type](state, action);
		}
		return state;
	};

/**
 * @Descripttion: 过滤对象中的某些属性
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {object} obj 原始对象
 * @param {array} excludeKeys 要排除的属性列表
 * @return {object} 返回一个过滤后的对象
 */
export const filterObj = (obj: Record<unknown, unknown>, excludeKeys: Array<unknown>): Record<string, unknown> => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach(key => {
		if (excludeKeys.includes(key)) delete newObj[key];
	});
	return newObj;
};
