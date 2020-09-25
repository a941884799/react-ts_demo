/** @format */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
// redux练习页面的路由配置
import ReduxDemo from '@pages/ReduxDemo'
import React from 'react'

const ReduxDemoRoutes: routerTypes.RouteConfig = {
  key: 'ReduxDemo',
  component: ReduxDemo,
  path: '/ReduxDemo',
  redirect: '/ReduxDemo/1',
  title: 'ReduxDemo',
  isMenu: true,
  children: [
    {
      key: '1',
      component: () => <div>Item1</div>,
      path: '/ReduxDemo/1',
      redirect: '/ReduxDemo/1/1',
      title: 'Item1',
      isMenu: true,
      menuCategory: 'SubMenu',
      children: [
        {
          key: '1-1',
          component: () => <div>Item1-1</div>,
          path: '/ReduxDemo/1/1',
          redirect: '/ReduxDemo/1/1/2',
          title: 'Item1-1',
          isMenu: true,
          children: [
            {
              key: '1-1-1',
              component: () => <div>Item1-1-1</div>,
              path: '/ReduxDemo/1/1/1',
              title: 'Item1-1-1',
              isMenu: true,
              // children: [],
            },
            {
              key: '1-1-2',
              component: () => <div>Item1-1-2</div>,
              path: '/ReduxDemo/1/1/2',
              title: 'Item1-1-2',
              isMenu: true,
              // children: [],
            },
            {
              key: '1-1-3',
              component: () => <div>Item1-1-3</div>,
              path: '/ReduxDemo/1/1/3',
              title: 'Item1-1-3',
              isMenu: true,
              // children: [],
            },
          ],
        },
        {
          key: '1-2',
          component: () => <div>Item1-2</div>,
          path: '/ReduxDemo/1/2',
          title: 'Item1-2',
          isMenu: true,
          // children: [],
        },
        {
          key: '1-3',
          component: () => <div>Item1-3</div>,
          path: '/ReduxDemo/1/3',
          title: 'Item1-3',
          isMenu: true,
          // children: [],
        },
      ],
    },
    {
      key: '2',
      component: () => <div>menuItem2</div>,
      path: '/ReduxDemo/2',
      redirect: '/ReduxDemo/2/1',
      title: 'menuItem2',
      isMenu: true,
      menuCategory: 'ItemGroup',
      children: [
        {
          key: '2-1',
          component: () => <div>menuItem2-1</div>,
          path: '/ReduxDemo/2/1',
          title: 'menuItem2-1',
          isMenu: true,
          // children: [],
        },
        {
          key: '2-2',
          component: () => <div>menuItem2-2</div>,
          path: '/ReduxDemo/2/2',
          title: 'menuItem2-2',
          isMenu: true,
          // children: [],
        },
        {
          key: '2-3',
          component: () => <div>menuItem2-3</div>,
          path: '/ReduxDemo/2/3',
          title: 'menuItem2-3',
          isMenu: true,
          // children: [],
        },
      ],
    },
    {
      key: '3',
      component: () => <div>menuItem3</div>,
      path: '/ReduxDemo/3',
      redirect: '/ReduxDemo/3/1',
      title: 'menuItem3',
      isMenu: true,
      menuCategory: 'SubMenu',
      children: [
        {
          key: '3-1',
          component: () => <div>Item1-1</div>,
          path: '/ReduxDemo/3/1',
          title: 'menuItem3-1',
          isMenu: true,
          // children: [],
        },
        {
          key: '3-2',
          component: () => <div>Item1-2</div>,
          path: '/ReduxDemo/3/2',
          title: 'menuItem3-2',
          isMenu: true,
          // children: [],
        },
        {
          key: '3-3',
          component: () => <div>Item1-3</div>,
          path: '/ReduxDemo/3/3',
          title: 'menuItem3-3',
          isMenu: true,
          // children: [],
        },
      ],
    },
  ],
}

export default ReduxDemoRoutes
