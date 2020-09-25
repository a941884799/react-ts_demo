/** @format */
import React, {useEffect} from 'react'
import {keyToPath} from '@router/index'
/**
 * WangLonggang 的 RouterDemo
 * */
let count = 0
const msgList = [
  '恭喜你,你已触发禁闭模式,你除了关窗口,不然出不去了',
  '别试了,你真的出不去了',
  '哦豁,你还不信?',
  '算了,告诉你吧,点下首页你就可以出去了',
]
const RouterDemo = ({history}: {history: History; location: Location}) => {
  useEffect(() => {
    if (count !== 0) return
    // 监听路由变化，跳转Users页面时取消监听
    const unlisten = history.listen(location => {
      console.log(`当前地址为${location.pathname}`, count)
      // 进入/Wlg/RouterDemo页面后，除非跳转/Home页取消监听，否则无法离开此页面
      if (location.pathname === '/Wlg/RouterDemo') count++
      if (location.pathname !== '/Wlg/RouterDemo') history.push(keyToPath.get('WlgRouterDemo'))
      if (location.pathname === '/Home') {
        unlisten()
        count = null
      }
    })
  }, [])
  return (
    <div>{count === null ? '禁闭模式已关闭' : count <= 3 ? msgList[count] : '傻子吧,教都教不会,你倒是点首页啊'}</div>
  )
}

export default RouterDemo
