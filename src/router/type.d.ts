declare namespace Route {
  export interface RouteConfig {
    title: string; // 路由的标题
    key: string; // 路由的key，不能重复
    parentKey?: string; // 父路由的key值，自动收集
    rootKey?: string; // 根路由的key，自动收集
    path: string; // 路由的path路径
    redirect?: string; // 重定向到此路径
    component: React.ReactNode;
    children?: RouteConfig[];
    // Menu组件相关属性
    hideSider?: boolean; // 隐藏侧边导航栏，只在根路由上配置
    hideMenu?: boolean; // 不在菜单上显示(带动态参数的路由不适合在导航菜单上展示)
    menuCategory?: 'Item' | 'SubMenu' | 'ItemGroup'; // 在侧边导航栏使用此组件渲染当前路由，默认为 'Item'
    icon?: React.ReactNode; // icon图标
    [propName: string]: unknown;
  }
}
