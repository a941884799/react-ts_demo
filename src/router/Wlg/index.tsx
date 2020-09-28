/** @format */
import React from 'react'
import ReduxDemo from '@pages/Wlg/ReduxDemo'
import RouterDemo from '@pages/Wlg/RouterDemo'
import {DatabaseFilled} from '@ant-design/icons'

const WlgRoutes: Types.RouteConfig = {
  title: "Wlg'sDemo",
  key: 'Wlg',
  path: '/Wlg',
  redirect: '/Wlg/ReduxDemo',
  isMenu: true,
  children: [
    {
      title: 'ReduxDemo',
      key: 'WlgReduxDemo',
      path: '/Wlg/ReduxDemo',
      isMenu: true,
      component: ReduxDemo,
      icon: <DatabaseFilled />,
    },
    {
      title: 'RouterDemo',
      key: 'WlgRouterDemo',
      path: '/Wlg/RouterDemo',
      isMenu: true,
      component: RouterDemo,
      icon: <DatabaseFilled />,
    },
  ],
}

export default WlgRoutes
