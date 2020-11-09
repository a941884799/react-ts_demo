/**
 * 入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '@styles/global';
import { globalVar } from '@utils/index';

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
	top: 30,
	duration: 2,
	maxCount: 2,
	prefixCls: 'my-message ant-message',
});

// 注册全局变量，解决按需引入polyfill的缺陷
globalVar();

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
