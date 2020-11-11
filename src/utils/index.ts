/** @format */

/**
 * @Descripttion: 注册全局变量，解决按需引入polyfill的缺陷
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param
 * @return
 */
export function globalVar(): void {
	// 将Promise抛出为全局对象
	window.Promise = Promise;
}

/**
 * @Descripttion: 过滤对象中的某些属性
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {object} obj 原始对象
 * @param {array} excludeKeys 要排除的属性列表
 * @return {object} 返回一个过滤后的对象
 */
export function filterObj(obj: Record<unknown, unknown>, excludeKeys: Array<unknown>): Record<string, unknown> {
	const newObj = { ...obj };
	Object.keys(newObj).forEach(key => {
		if (excludeKeys.includes(key)) delete newObj[key];
	});
	return newObj;
}

/**
 * @name getType
 * @desc 获取某个元素的类型
 * @author 王龙岗
 * @time 2020年11月10日 15:16:24 星期二
 * @param {unknown} v 要获取类型的元素
 * @return {string} type
 */
export function getType(v: unknown): string {
	const { toString } = Object.prototype;
	const map: {
		[key: string]: string;
	} = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object',
	};
	if (v instanceof Element) {
		return 'element';
	}
	const temp = toString.call(v);
	if (hasOwn(map, temp)) {
		return map[temp];
	}
	return typeof v;
}

/**
 * @name	sleep
 * @desc	等待延迟
 * @author 王龙岗
 * @time 2020年11月11日 09:59:03 星期三
 * @param {Number} delay 延迟时间
 * @param {Function} cd 延迟后执行函数
 */
export const sleep = (delay = 0, cb = () => null): void =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(typeof cb === 'function' && cb());
		}, delay);
	});
