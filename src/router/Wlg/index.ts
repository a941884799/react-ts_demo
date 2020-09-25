/** @format */

import ReduxDemo from '@pages/Wlg/ReduxDemo'
import RouterDemo from '@pages/Wlg/RouterDemo'

const WlgRoutes: routerTypes.RouteConfig = {
  title: '王某的demo',
  key: 'Wlg',
  path: '/Wlg',
  redirect: '/Wlg/ReduxDemo',
  isMenu: true,
  children: [
    {
      title: 'Wlg的redux demo',
      key: 'WlgReduxDemo',
      path: '/Wlg/ReduxDemo',
      isMenu: true,
      component: ReduxDemo,
    },
    {
      title: 'Wlg的router demo',
      key: 'WlgRouterDemo',
      path: '/Wlg/RouterDemo',
      isMenu: true,
      component: RouterDemo,
    },
  ],
}

export default WlgRoutes
