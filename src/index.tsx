/**
 * 入口文件
 */
// '@babel/env'的useBuiltIns为false或'entry'时需在入口处引入下面两项
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '@styles/global.scss';

/** =========== router全局配置 =========== **/
import { Router } from 'react-router-dom';
import { globalHistory } from '@router/index';

/** =========== redux全局配置 =========== **/
import { Provider } from 'react-redux';
import store from '@store/index';

/** =========== antd全局配置 =========== **/
// 引入antd组件库样式
import 'antd/dist/antd.css';

// 修改 antd 组件默认文案为中文
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

// 设置 moment 为中文格式
import { locale } from 'moment';
import 'moment/locale/zh-cn';
locale('zh-cn');

// 配置全局 message
message.config({
  // duration: 6,
  // maxCount: 4,
  rootPrefixCls: 'my-message ant-message', // ant-message 必须放最后，否则默认样式无法生效
});

render(
  <Provider store={store}>
    <Router history={globalHistory}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
