/** @format */
/**
 * WangLonggang 的 RouterDemo
 * */
import React, {useEffect} from 'react'
import {keyToPath} from '@router/index'
import {PageHeader} from 'antd'
import './index.scss'

const RouterDemo = ({history}: {history: History; location: Location}) => {
  useEffect(() => {
    // 监听路由变化，跳转Users页面时取消监听
    const unlisten = history.listen(location => {
      console.log(`当前地址为${location.pathname}`)
      // 进入/Wlg/RouterDemo页面后，除非跳转/Home页取消监听，否则无法离开此页面
      if (location.pathname !== '/Wlg/RouterDemo') history.push(keyToPath.get('WlgRouterDemo'))
      if (location.pathname === '/Home') {
        unlisten()
      }
    })
  }, [])
  return (
    <div className="page-WlgRouterDemo">
      <PageHeader title="RouterDemo" subTitle="This is a subtitle" />
    </div>
  )
}

export default RouterDemo
