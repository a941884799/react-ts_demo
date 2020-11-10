/**
 * @name loadable
 * @desc 使用 React16+ 自带的 Suspense lazy 动态引入组件(实现按需引入组件，进行代码分隔)
 * @desc 在webpack2+中使用import(),它会自动分割代码
 * @time 2020年11月10日 09:40:42 星期二
 * @param {() => Promise<ReactNode>} loader 例：() => import('@pages/Home')
 * @param {ReactNode} Loading  加载过程中你想展示的 React 元素,不传则使用默认的转场组件
 * @return  {ReactNode} 返回一个异步加载的组件
 */
import React, { ReactNode, lazy, Suspense } from 'react';
import TransitionComponent from '@components/base-ui/TransitionComponent';

const loadable = (loader: () => Promise<ReactNode>, Loading?: ReactNode): ReactNode => {
	const AsyncComponent = lazy(loader);
	const LoadableCom = props => (
		<Suspense fallback={<TransitionComponent Loading={Loading} />}>
			<AsyncComponent {...props} />
		</Suspense>
	);
	return LoadableCom;
};

export default loadable;
