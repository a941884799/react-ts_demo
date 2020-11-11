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
			component: lazy(
				() =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve(import(/* webpackChunkName: "ReduxDemo" */ '@pages/Wlg/ReduxDemo'));
						}, 2000);
					}),
			),
			icon: <DatabaseFilled />,
		},
		{
			title: 'RouterDemo',
			key: 'WlgRouterDemo',
			path: '/Wlg/RouterDemo',
			isMenu: true,
			// component: lazy(() => import(/* webpackChunkName: "RouterDemo" */ '@pages/Wlg/RouterDemo')),
			component: lazy(
				() =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve(import(/* webpackChunkName: "RouterDemo" */ '@pages/Wlg/RouterDemo'));
						}, 2000);
					}),
			),
			icon: <DatabaseFilled />,
		},
		{
			title: '表单练习',
			key: 'WlgFormDemo',
			path: '/Wlg/FormDemo',
			isMenu: true,
			// component: lazy(() => import(/* webpackChunkName: "FormDemo" */ '@pages/Wlg/FormDemo')),
			component: lazy(
				() =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve(import(/* webpackChunkName: "FormDemo" */ '@pages/Wlg/FormDemo'));
						}, 2000);
					}),
			),
			icon: <DatabaseFilled />,
		},
	],
};

export default WlgRoutes;
