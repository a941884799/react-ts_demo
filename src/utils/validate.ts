/**
 * 身份证
 * @param str
 */
export function isIDCard(str: string): boolean {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str);
}

/**
 * IP地址
 * @param str
 */
export function isIP(str: string): boolean {
  const ipv6 = /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
  const ipv4 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return ipv4.test(str) || ipv6.test(str);
}

/**
 * IPv4+端口
 * @param str
 */
export function isIPProt(str: string): boolean {
  const ipv4Prot = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
  return ipv4Prot.test(str);
}

/**
 * 链接校验 包括到了IP，域名，URL
 * @param str 校验值
 * @param testIp 是否检测IP格式
 * @returns {boolean}
 */
export function isLink(str = '', testIp = true): boolean {
  return isDomain(str) || isUrl(str) || (testIp && isIP(str));
}

/**
 * 特殊字符
 * @param str
 */
export function isSpecialStr(str: string): boolean {
  const regEn = /[`~!@#$%^&+<>?:"{};'[\]]/im;
  const regCn = /[·！#￥——：；“”‘、，|《。》？、【】[\]]/im;
  return regEn.test(str) || regCn.test(str);
}

/**
 * 域名格式校验--纯域名
 * @param str
 */
export function isDomain(str: string): boolean {
  const domainRegExp = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
  return domainRegExp.test(str);
}

/**
 * 域名格式校验--支持带协议的域名
 * @param domain
 * @returns {boolean}
 */
export function isDomainContainsProtocol(domain: string): boolean {
  const domainContainsProtocolRegExp = /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
  return domainContainsProtocolRegExp.test(domain);
}

/**
 * 域名格式校验--支持中文域名
 */
export function isDomainZh(domain: string): boolean {
  const domainRegExp = /^[a-zA-Z0-9-_\u4e00-\u9fa5]+(\.[a-zA-Z0-9-_\u4e00-\u9fa5]+)+$/;
  return domainRegExp.test(domain);
}

/**
 * 是否是以英文逗号分隔的域名组合--支持中文域名
 * eg：www.tencent.com,www.qq.com,www.蝶澈.com
 */
export function isDomainGroup(domains: string): boolean {
  const reg = /^([a-zA-Z0-9-_\u4e00-\u9fa5]+(\.[a-zA-Z0-9-_\u4e00-\u9fa5]+)+)(,[a-zA-Z0-9-_\u4e00-\u9fa5]+(\.[a-zA-Z0-9-_\u4e00-\u9fa5]+)+)*$/;
  return reg.test(domains);
}

/**
 * url
 * @param str
 */
export function isUrl(str: string): boolean {
  const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
  return reg.test(str);
}

/**
 * 校验QQ
 * @param {string} str
 */
export function isQQ(str = ''): boolean {
  return /^[1-9][0-9]{4,}$/.test(str);
}

/**
 * Email
 * @param str
 */
export function isEmail(str: string): boolean {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(str);
}

/**
 * 手机号码
 * @param str
 */
export function isMobilePhone(str: string): boolean {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(str);
}

/**
 * 电话号码
 * @param str
 */
export function isTelephone(str: string): boolean {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  return reg.test(str);
}

/**
 * 正则校验中英文姓名
 */
export function isOuterUserName(name: string): boolean {
  const reg = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z.·●\s\d（）()\u4e00-\u9fa5]*[a-zA-Z\d）)\u4e00-\u9fa5]$/;
  return reg.test(name);
}

/**
 * 浮点数
 * @param str
 */
export function isNumber(str: string): boolean {
  const reg = /^([-+]?\d+)(\.\d+)?$/;
  return reg.test(str);
}

/**
 * 验证数组的值是否唯一,是返回true
 * @param {Array} arr
 */
export function isRepeat(arr: Array): boolean {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.includes(arr[i])) return false;
    newArr.push(arr[i]);
  }
  return true;
}

/**
 * @desc 检查 obj 是否包含 key
 * @param {Object} obj 要检查的对象
 * @param {string} key 要检查的key
 * @return  {boolean}
 */
export function hasOwn(obj: Record<string, unknown>, key: string): boolean {
  return obj && hasOwnProperty.call(obj, key);
}
