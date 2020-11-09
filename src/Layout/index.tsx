/** @format */
/**
 * 整体页面布局文件
 */
import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { Layout, Menu, Breadcrumb, message } from 'antd';
// 路由配置
import RouterComponents, { pathToRoute, keyToRoute, keyToPath, routesConfig } from '@router';
import { useLocation, useHistory } from 'react-router';
import { filterObj } from '@utils/index';
import './index.scss';

const { SubMenu, ItemGroup } = Menu;
const { Header, Content, Sider } = Layout;
type RouteConfig = Route.RouteConfig;

// 排除路由配置中非 菜单组件props的属性
const filterRouteConfig = (route: RouteConfig) => {
	const excludeKeys = ['rootKey', 'parentKey', 'hideSider', 'isMenu', 'menuCategory', 'component', 'children'];
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
 * @Descripttion: 根据路由配置设置面包屑
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {RouteConfig} route 路由配置
 * @return {ReactNode} 格式化后的数据
 */
const RouteToBreadcrumbList = (route: RouteConfig): React.ReactNode => {
	const RouteList: RouteConfig[] = [route];
	let currentRoute = route;
	while (currentRoute.parentKey) {
		currentRoute = keyToRoute.get(currentRoute.parentKey);
		RouteList.unshift(currentRoute);
	}
	// 只有一条则不显示面包屑
	if (RouteList.length === 1) return null;
	return RouteList.map((route: RouteConfig, idx: number) => (
		<Breadcrumb.Item key={route.key || idx} href={`#${route.path}`}>
			{route.title}
		</Breadcrumb.Item>
	));
};
/**
 * @Descripttion: 根据路由配置设置侧边导航栏
 * @Author: WangLonggang
 * @Date: 2020-09-24 11:41:48
 * @param {RouteConfig} route 路由配置
 * @return {ReactNode} 格式化后的数据
 */
const RouteToMenuList = (route: RouteConfig): React.ReactNode => {
	const { isMenu, children } = route;
	if (!isMenu) return null;
	// 存在子路由时遍历子路由配置渲染子节点
	if (children) {
		return children.map((sonRoute: unknown) => {
			switch (sonRoute.menuCategory) {
				case 'SubMenu':
					return <SubMenu {...filterRouteConfig(sonRoute)}>{RouteToMenuList(sonRoute)}</SubMenu>;
				case 'ItemGroup':
					return <ItemGroup {...filterRouteConfig(sonRoute)}>{RouteToMenuList(sonRoute)}</ItemGroup>;
				default:
					return RouteToMenuList(sonRoute);
			}
		});
	}
	// 不存在子路由
	return <Menu.Item {...filterRouteConfig(route)}>{route.title}</Menu.Item>;
};

/**
 * 我的页面布局主组件
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
		const timer = setTimeout(() => {
			setOpenKeys(newOpenKeys);
			clearTimeout(timer);
		}, 0);
	}, []);
	// 路由变化，重新设置展开的 SubMenu 菜单项 key 数组
	useEffect(() => {
		const newOpenKeys = openKeys.concat(getOpenKeys(currentRoute.parentKey));
		// 去重
		setOpenKeys(_.uniq(newOpenKeys));
	}, [currentRoute.parentKey]);
	return (
		<Layout className="root-layout">
			<Header className="root-header">
				<div className="logo">react+ts demo</div>
				{/* 顶部导航,只渲染根路由 */}
				<Menu
					className="root-header-menus"
					theme="dark"
					mode="horizontal"
					selectedKeys={[currentRootRoute.key]}
					onClick={toPage}
				>
					{routesConfig.map((rootRoute: RouteConfig) => (
						<Menu.Item key={rootRoute.key}>{rootRoute.title}</Menu.Item>
					))}
				</Menu>
			</Header>
			<Layout>
				{/* 根据当前根路由配置设置侧边导航栏 */}
				{(function () {
					const { hideSider }: unknown = currentRootRoute;
					// 隐藏侧边导航栏
					if (hideSider) return <></>;
					return (
						<Sider
							className="root-sider"
							width={200}
							breakpoint="md"
							collapsible
							onCollapse={collapsed => {
								// onCollapse 会自动触发 onOpenChange([])
								if (collapsed) return;
								const newOpenKeys = openKeys.concat(getOpenKeys(currentRoute.parentKey));
								setOpenKeys(_.uniq(newOpenKeys));
							}}
						>
							<Menu
								className="root-sider-menus"
								mode="inline"
								theme="dark"
								openKeys={openKeys}
								selectedKeys={[currentRoute.key]}
								onClick={toPage}
								onOpenChange={onOpenChange}
							>
								{/* 将路由转化为菜单列表 */}
								{RouteToMenuList(currentRootRoute)}
							</Menu>
						</Sider>
					);
				})()}
				<Layout className="root-content-container">
					{/* 根据路由层级，设置面包屑 */}
					<Breadcrumb className="root-breadcrumb">{RouteToBreadcrumbList(currentRoute)}</Breadcrumb>
					<Content className="root-content">
						<RouterComponents />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default MyLayout;
