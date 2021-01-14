/** @format */
/**
 * 整体页面布局文件
 */
import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { Layout, Menu, message, Breadcrumb } from 'antd';
import GoBack from '@components/GoBack';
// 路由配置
import RouterComponents, { pathToRoute, keyToRoute, keyToPath, routesConfig } from '@router/index';

import uniq from 'lodash/uniq';
import { filterObj, sleep } from '@utils/index';
import './index.scss';

const { SubMenu, ItemGroup } = Menu;
const { Header, Content, Sider } = Layout;
type RouteConfig = Route.RouteConfig;

// 排除路由配置中非 菜单组件props的属性
const filterRouteConfig = (route: RouteConfig) => {
  const excludeKeys = [
    'rootKey',
    'parentKey',
    'hideSider',
    'hidePageHeader',
    'isMenu',
    'menuCategory',
    'component',
    'children',
  ];
  return filterObj(route, excludeKeys);
};

// 获取openKeys(当前展开的 SubMenu 菜单项 key 数组)
const getOpenKeys = (parentKey: string): string[] => {
  if (!parentKey) return [];
  const parentRoute: RouteConfig = keyToRoute.get(parentKey);
  const OpenKeys: string[] = parentRoute.menuCategory === 'SubMenu' ? [parentKey] : [];
  return OpenKeys.concat(getOpenKeys(parentRoute?.parentKey));
};

/**
 * @Descripttion: 根据 当前根路由 设置侧边导航栏
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {RouteConfig} route 路由配置
 * @return {ReactNode} 格式化后的数据
 */
const renderMenuList = (route: RouteConfig): React.ReactNode => {
  const { hideMenu, children } = route;
  if (hideMenu) return null;
  // 存在子路由时遍历子路由配置渲染子节点
  if (children) {
    return children.map((sonRoute: unknown) => {
      const menuProps = filterRouteConfig(sonRoute);
      switch (sonRoute.menuCategory) {
        case 'SubMenu':
          return <SubMenu {...menuProps}>{renderMenuList(sonRoute)}</SubMenu>;
        case 'ItemGroup':
          return <ItemGroup {...menuProps}>{renderMenuList(sonRoute)}</ItemGroup>;
        default:
          return renderMenuList(sonRoute);
      }
    });
  }
  // 不存在children
  return <Menu.Item {...filterRouteConfig(route)}>{route.title}</Menu.Item>;
};

/**
 * @Descripttion: 根据路由配置设置面包屑
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {RouteConfig} _currentRoute 路由配置
 * @return {ReactNode} 格式化后的数据
 */
const renderBreadcrumbs = (_currentRoute: RouteConfig): React.ReactNode => {
  let currentRoute = { ..._currentRoute };
  const RouteList: RouteConfig[] = [];
  if (currentRoute?.key) RouteList.unshift(currentRoute);
  while (currentRoute.parentKey) {
    currentRoute = keyToRoute.get(currentRoute.parentKey);
    RouteList.unshift(currentRoute);
  }
  return RouteList.map((route: RouteConfig, index: number) => (
    <Breadcrumb.Item key={route.key}>
      {index === RouteList.length - 1 ? (
        <span style={{ fontWeight: 700 }}>{route.title}</span>
      ) : (
        <NavLink exact to={route.path}>
          {route.title}
        </NavLink>
      )}
    </Breadcrumb.Item>
  ));
};

/**
 * Layout组件
 * */
const MyLayout = (): ReactNode => {
  // 获取当前根路由配置
  const location = useLocation();
  const history = useHistory();
  // 当前路由
  const currentRoute: RouteConfig = pathToRoute.get(location.pathname) || {};
  // 当前根路由
  const currentRootRoute: RouteConfig = keyToRoute.get(currentRoute.rootKey) || currentRoute;
  // 展开的 SubMenu 菜单项 key 数组
  const [openKeys, setOpenKeys] = useState([]);

  // 页面跳转
  const toPage = useCallback(({ key }) => {
    const path = keyToPath.get(key);
    if (!path) return message.error('找不到此路由path，请确认此路由配置是否正确');
    history.push(path);
  }, []);
  // 展开收起SubMenu的回调
  const onOpenChange = useCallback((newOpenKeys: string[]) => {
    // onCollapse 触发的 onOpenChange有bug，需要延时一下
    sleep(0, () => setOpenKeys(newOpenKeys));
  }, []);

  // 路由变化，重新设置展开的 SubMenu 菜单项 key 数组
  useEffect(() => {
    const newOpenKeys = openKeys.concat(getOpenKeys(currentRoute.parentKey));
    // 去重
    setOpenKeys(uniq(newOpenKeys));
  }, [currentRoute.parentKey]);

  return (
    <Layout className="root-layout-container">
      <Header className="root-header">
        <div className="logo" />
        {/* 顶部导航,只渲染根路由 */}
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentRootRoute.key]} onClick={toPage}>
          {routesConfig.map((rootRoute: RouteConfig) => (
            <Menu.Item key={rootRoute.key}>{rootRoute.title}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout>
        {/* 根据当前根路由配置设置侧边导航栏 */}
        {!currentRootRoute?.hideSider && (
          <Sider
            className="root-sider"
            width={200}
            breakpoint="md"
            collapsible
            onCollapse={collapsed => {
              // onCollapse 会自动触发 onOpenChange([])
              if (collapsed) return;
              const newOpenKeys = openKeys.concat(getOpenKeys(currentRoute.parentKey));
              setOpenKeys(uniq(newOpenKeys));
            }}
          >
            <Menu
              mode="inline"
              theme="dark"
              openKeys={openKeys}
              selectedKeys={[currentRoute.key]}
              onClick={toPage}
              onOpenChange={onOpenChange}
            >
              {renderMenuList(currentRootRoute)}
            </Menu>
          </Sider>
        )}
        <Layout>
          {/* 根据路由层级，设置面包屑 */}
          <div className="root-breadcrumb flex-y-center flex-1">
            <GoBack key="GoBack" />
            <Breadcrumb className="flex-1 text-ellipsis">{renderBreadcrumbs(currentRoute)}</Breadcrumb>
          </div>
          <Content className="root-content">
            <RouterComponents />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
