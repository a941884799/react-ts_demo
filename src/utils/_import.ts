/**
 * @desc 封装 import(), 异步加载 pages目录 中的页面组件
 * @param {string} file 组件在pages目录中路径
 */

import { lazy, LazyExoticComponent } from 'react';
export default (file: string): LazyExoticComponent => lazy(() => import(`@pages/${file}`));
