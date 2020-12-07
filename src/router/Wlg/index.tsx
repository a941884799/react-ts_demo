import React, { lazy } from 'react';
import { DatabaseFilled } from '@ant-design/icons';

const WlgRoutes: Route.RouteConfig = {
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
      // component: lazy(() => import(/* webpackChunkName: "ReduxDemo" */ '@pages/Wlg/ReduxDemo')),
      component: lazy(() => import('@pages/Wlg/ReduxDemo')),
      icon: <DatabaseFilled />,
    },
    {
      title: 'RouterDemo',
      key: 'WlgRouterDemo',
      path: '/Wlg/RouterDemo',
      isMenu: true,
      component: lazy(() => import('@pages/Wlg/RouterDemo')),
      icon: <DatabaseFilled />,
    },
    {
      title: '表单练习',
      key: 'WlgFormDemo',
      path: '/Wlg/FormDemo',
      isMenu: true,
      component: lazy(() => import('@pages/Wlg/FormDemo')),
      icon: <DatabaseFilled />,
    },
  ],
};

export default WlgRoutes;
