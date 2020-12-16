/**
 * @name _import
 * @desc 封装 import(), 异步加载 pages目录 中的页面组件
 * @author Falost
 * @time 2020年12月16日 14:06:11 星期三
 * @param {string} file 组件在pages目录中路径
 * @return {LazyExoticComponent}
 */

import { lazy, LazyExoticComponent } from 'react';
export default (file: string): LazyExoticComponent => lazy(() => import(`@pages/${file}`));
