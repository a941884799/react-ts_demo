/** @format */

import React from 'react'
import {render} from 'react-dom'
import Hello from '@components/Hello'
import '@src/global.scss'
import {globalVar} from '@utils/publick'
import {c} from '@src/utils'
// import _ from 'lodash'
const a = 123
a = 3
// 注册全局变量，解决按需引入polyfill的缺陷
globalVar()

render(<Hello msg={c} />, document.getElementById('root'))
