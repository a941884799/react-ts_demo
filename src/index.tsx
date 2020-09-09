/** @format */

import React from 'react'
import {render} from 'react-dom'
import {Router} from 'react-router-dom'
import {createHashHistory} from 'history'
import {Provider} from 'react-redux'
import store from '@store/index'
import App from './App'
import '@styles/global.scss' // 引入全局样式
import {globalVar} from '@utils/index'

// 注册全局变量，解决按需引入polyfill的缺陷
globalVar()

export const history = createHashHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
