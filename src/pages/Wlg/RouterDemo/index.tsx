/** @format */
/**
 * WangLonggang 的 RouterDemo
 * */
import React, { useCallback, useEffect, useState } from 'react';
import { PageHeader, Tag, Button, message, Spin } from 'antd';
import { History } from 'history'; // ts类型
import './index.scss';
import { pathToRoute } from '@router/index';

let initUnlisten = null;
let initUnblock = null;
const RouterDemo = ({ history }: { history: History }) => {
	const [unlisten, setUnlisten] = useState<() => void>(() => initUnlisten);
	const [unblock, setUnblock] = useState<() => void>(() => initUnblock);
	// 开启路由监听
	const onListen = useCallback(() => {
		if (unlisten) return; // 防止重复监听
		message.info('路由监听已开启,跳转页面将进行提示');
		initUnlisten = history.listen(location => {
			const { title } = pathToRoute.get(location.pathname);
			message.success(`欢迎来到${title}页`);
		});
		setUnlisten(() => initUnlisten);
	}, [history.listen, unlisten]);
	// 关闭路由监听
	const onUnlisten = useCallback(() => {
		if (unlisten) {
			unlisten();
			setUnlisten((initUnlisten = null));
			message.info('路由监听已关闭,跳转页面将不再提示');
		}
	}, [unlisten]);
	// 开启路由拦截
	const onBlock = useCallback(() => {
		if (unblock) return; // 防止重复拦截
		message.info('路由拦截已开启,将阻止路由跳转');
		initUnblock = history.block(() => {
			message.info('路由跳转被拦截，请先关闭路由拦截');
			return false;
		});
		setUnblock(() => initUnblock);
	}, [unblock]);
	// 关闭路由拦截
	const onUnblock = useCallback(() => {
		if (unblock) {
			unblock();
			setUnblock((initUnblock = null));
			message.info('路由监听已关闭,跳转页面将不再提示');
		}
	}, [unblock]);
	useEffect(() => {
		console.log('unlisten或unblock更新');
	}, [unblock, unlisten]);
	return (
		<div className="page-WlgRouterDemo">
			<PageHeader
				title="RouterDemo"
				subTitle="This is router demo"
				tags={<Tag color="green">demo</Tag>}
				extra={[
					<Button key="1" onClick={unlisten ? onUnlisten : onListen}>
						{unlisten ? '关闭路由监听' : '开启路由监听'}
					</Button>,
					<Button key="2" onClick={unblock ? onUnblock : onBlock}>
						{unblock ? '关闭路由拦截' : '开启路由拦截'}
					</Button>,
				]}
			/>
			<Spin tip="路由监听中..." spinning={unlisten} />
			<Spin tip="路由拦截中..." spinning={unblock} />
		</div>
	);
};

export default RouterDemo;
