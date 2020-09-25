/** @format */
import React, {useEffect} from 'react'
/**
 * WangLonggang 的 RouterDemo
 * */
const RouterDemo = ({history, location}: {history: History; location: Location}) => {
  useEffect(() => {
    // 监听路由变化，跳转Users页面时取消监听
    const unlisten = history.listen(location => {
      if (location.pathname === '/Home') {
        unlisten()
        console.log('取消监听路由变化')
      }
    })
  }, [])
  return <div>{`当前地址为${location.pathname}`}</div>
}

export default RouterDemo
