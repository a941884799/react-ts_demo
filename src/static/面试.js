/* eslint-disable no-unused-vars */
console.log('hello,这是静态资源目录');

// 版本号排序
const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];
const sortFn = (arr = []) =>
  arr.sort((item1, item2) => {
    const list1 = item1.split('.').reverse();
    const list2 = item2.split('.').reverse();
    const count = Math.max(list1.length, list2.length);
    for (let idx = 0; idx < count; idx++) {
      if (list1[idx] !== list2[idx]) {
        return (list2[idx] ?? 0) - (list1[idx] ?? 0);
      }
    }
    return 0;
  });

// 对下面数组进行排重，并按 升序 排序，代码尽量简练:
const array = ['2', 'b', '9', 'a', '7', '3', '4', 'b', '6', '4'];
function handle(arr) {
  return [...new Set(arr)].sort();
}

// 写一个提取 URL 参数的 js 方法，要求：只识别queryParam，排除 hash 的干扰
function getParamFromURL(url, key) {
  //...your code
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
}

// 编写一道正则表达式，最大限度的匹配对方聊天内容中的 url。
// 要求：仅仅识别 tmall.com 以及 taobao.com 这两个域名下的链接
function getUrlFromWords(text) {
  return text.match(
    /(((ht|f)tps?):\/\/)?([\w]+\.)?((taobao\.com)|(tmall\.com))(\/[\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/g,
  );
}
