/** @format */

/**
 * @Descripttion: 过滤对象中的某些属性
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
 * @desc 检查 obj 是否包含 key
 * @param {Object} obj 要检查的对象
 * @param {string} key 要检查的key
 */
export function hasOwn(obj: Record<string, unknown>, key: string): boolean {
  return obj && hasOwnProperty.call(obj, key);
}

/**
 * @desc 获取某个元素的类型
 * @param {unknown} v 要获取类型的元素
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
 * @desc	等待延迟
 * @param {Number} delay 延迟时间
 * @param {Function} cd 延迟后执行函数
 */
export const sleep = (delay = 0, cb = () => null): void =>
  new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(typeof cb === 'function' && cb());
    }, delay);
  });
