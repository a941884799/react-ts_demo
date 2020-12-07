/** @format */
/**
 * 路由配置,侧边导航栏只展示前三层路由
 */
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TransitionComponent from '@src/components/TransitionComponent';
import { createHashHistory } from 'history';
import Home from '@pages/Home'; // 首页组件
// 引入各模块路由配置
import WlgRoutes from '@src/router/Wlg';
// 全局 history
export const globalHistory = createHashHistory();

// 项目路由配置集合
export const routesConfig: Route.RouteConfig[] = [
  {
    key: 'Home',
    component: Home,
    path: '/Home',
    title: '首页',
    hideSider: true,
  },
  WlgRoutes,
];
// 依赖工具
export const pathToKey = new Map();
export const keyToPath = new Map();
export const keyToRoute = new Map();
export const pathToRoute = new Map();
export const pathList: string[] = [];
export const RouteList: React.ReactElement[] = [];

// 遍历路由配置集合，创建相应 Route 组件及收集依赖
routesConfig.forEach(route => createRoute(route));

/**
 * 根据路由配置创建对应 Route 组件及收集依赖
 * @param route // 当前路由
 * @param parent // 父路由
 */
function createRoute(route: Route.RouteConfig, parentKey?: string, rootKey?: string) {
  const { key, component: Component, path, redirect, children } = route;

  // 依赖工具收集
  keyToRoute.set(key, route);
  pathToKey.set(path, key);
  keyToPath.set(key, path);
  pathToRoute.set(path, route);
  pathList.push(path);

  // 记录父路由key值
  if (parentKey) route.parentKey = parentKey;
  // 记录根路由key值
  if (rootKey) route.rootKey = rootKey;
  if (redirect) {
    // 添加 Redirect 组件
    RouteList.push(<Redirect exact from={path} to={redirect} key={path} />);
  } else if (Component) {
    // 添加 Route 组件,如果Component是Promise,则用lazy包装
    RouteList.push(<Route trict exact key={key} path={path} component={Component} />);
  }
  // 创建子路由
  if (children?.length) children.forEach(childRoute => createRoute(childRoute, route.key, rootKey || route.key));
}

// 路由组件
const RouterComponents = (): ReactNode => (
  <Suspense fallback={<TransitionComponent />}>
    <Switch>
      {RouteList.concat(
        <Redirect exact from="/" to="/Home" key="/" />,
        <Route path="*" key="404">
          <div style={{ fontSize: 20, marginTop: 300, textAlign: 'center' }}>404</div>
        </Route>,
      )}
    </Switch>
  </Suspense>
);

export default RouterComponents;
