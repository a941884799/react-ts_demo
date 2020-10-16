/** @format */
/**
 * WangLonggang 的 ReduxDemo
 * */
import React from 'react';
// import {useDispatch, useSelector} from 'react-redux'
// import {Types, add} from '@store/actions/common'
import { PageHeader, Tag } from 'antd';
import './index.scss';

/**
 * 页面主组件
 */
const ReduxDemo = () => {
	return (
		<div className="page-WlgReduxDemo">
			<PageHeader title="ReduxDemo" subTitle="This is redux demo" tags={<Tag color="red">demo</Tag>} />
		</div>
	);
};

export default ReduxDemo;
