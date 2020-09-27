/** @format */

import ReduxDemo from '@pages/Wlg/ReduxDemo'
import RouterDemo from '@pages/Wlg/RouterDemo'

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
    },
    {
      title: 'RouterDemo',
      key: 'WlgRouterDemo',
      path: '/Wlg/RouterDemo',
      isMenu: true,
      component: RouterDemo,
    },
  ],
}

export default WlgRoutes
