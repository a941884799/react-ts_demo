/** @format */
/* 入口文件 全局配置 */
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store/index';
import { globalHistory } from '@router/index';
import App from './App';
import 'antd/dist/antd.css'; // 引入antd组件库样式
import '@styles/global'; // 引入全局样式
import { globalVar } from '@utils/index';

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
