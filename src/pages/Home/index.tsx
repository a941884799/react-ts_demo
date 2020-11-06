/**
 * 首页
 * */
import React, { ReactNode } from 'react';
import './index.scss';
const Home = (props: Record<string, unknown>): ReactNode => (
	<div className="page-Home" {...props}>
		欢迎欢迎......
	</div>
);

export default Home;
