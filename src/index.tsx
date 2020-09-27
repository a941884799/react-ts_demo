/** @format */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {render} from 'react-dom'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@store/index'
import {globalHistory} from '@router/index'
import App from './App'
import 'antd/dist/antd.css' // 引入antd组件库样式
import '@styles/global' // 引入全局样式
import {globalVar} from '@utils/index'
// // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import {locale} from 'moment'
import 'moment/locale/zh-cn'
locale('zh-cn')

// 注册全局变量，解决按需引入polyfill的缺陷
globalVar()

render(
  <Provider store={store}>
    <Router history={globalHistory}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
