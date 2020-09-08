/** @format */

import React from 'react'
import {render} from 'react-dom'
import {Router} from 'react-router-dom'
import {createHashHistory} from 'history'
import App from './App'
import '@src/global.scss' // 引入全局样式
import {globalVar} from '@src/utils'
// 注册全局变量，解决按需引入polyfill的缺陷
globalVar()

export const history = createHashHistory()

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
)
