import React from 'react';
import _import from '@utils/_import';
import { DatabaseFilled } from '@ant-design/icons';

const WlgRoutes: Route.RouteConfig = {
  title: '我的Demo',
  key: 'Wlg',
  path: '/Wlg',
  redirect: '/Wlg/ReduxDemo',
  children: [
    {
      title: 'Redux练习',
      key: 'WlgReduxDemo',
      path: '/Wlg/ReduxDemo',
      // component: lazy(() => import(/* webpackChunkName: "ReduxDemo" */ 'Wlg/ReduxDemo')),
      component: _import('Wlg/ReduxDemo'),
      icon: <DatabaseFilled />,
    },
    {
      title: 'Router练习',
      key: 'WlgRouterDemo',
      path: '/Wlg/RouterDemo',
      component: _import('Wlg/RouterDemo'),
      icon: <DatabaseFilled />,
    },
    {
      title: '表单练习',
      key: 'WlgFormDemo',
      path: '/Wlg/FormDemo',
      component: _import('Wlg/FormDemo'),
      icon: <DatabaseFilled />,
    },
    {
      title: 'Modal练习',
      key: 'WlgModal',
      path: '/Wlg/Modal',
      component: _import('Wlg/ModalDemo'),
      icon: <DatabaseFilled />,
    },
  ],
};

export default WlgRoutes;
