/** @format */

declare namespace Types {
	export interface RouteConfig {
		title: string; // 路由的标题
		key: string; // 路由的key，不能重复
		parentKey?: string; // 父路由的key值
		rootKey?: string; // 根路由的key
		path: string; // 路由的path路径
		redirect?: string; // 重定向到此路径
		component: React.ComponentType;
		children?: RouteConfig[];
		// Menu组件相关属性
		hideSider?: boolean; // 根路由特有属性，是否隐藏侧边导航栏
		isMenu?: boolean; // 是否将当前路由展示在侧边导航栏中(根路由默认渲染在顶部导航，所以不要设此属性)
		menuCategory?: 'Item' | 'SubMenu' | 'ItemGroup'; // 在侧边导航栏使用此组件渲染当前路由，默认为 'Item'
		icon?: React.ReactNode; // icon图标
		[propName: string]: any;
	}
}
