/** @format */

import React, {useEffect} from 'react'
import MyLayout from '@src/Layout'
import {globalHistory} from '@router/index'
import './store'

const App = (): JSX.Element => {
  useEffect(() => {
    // 监听路由变化，跳转Users页面时取消监听
    const unlisten = globalHistory.listen(location => {
      console.log(`当前地址为${location.pathname}`)
      if (location.pathname === '/Home') {
        unlisten()
        console.log('取消监听路由变化')
      }
    })
  }, [])
  return <MyLayout />
}

export default App
