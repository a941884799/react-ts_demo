/** @format */
/**
 * WangLonggang 的 ReduxDemo
 * */
import React from 'react';
import { Space, Button, Input, InputNumber, List, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Types } from '@store/actions/common';

const ReduxDemo = () => {
	const dispatch = useDispatch();
	const todos: [] = useSelector((store: any) => store.todos);
	const counter: number = useSelector((store: any) => store.counter);
	console.log('Home 重新渲染');
	return (
		<Space direction="vertical">
			<Input.Search
				size="large"
				placeholder="请输入todos列表要添加的内容"
				style={{ width: 500 }}
				onSearch={value => dispatch({ type: Types.ADD_TODO, text: value })}
				enterButton="添加"
			/>
			<div>
				列表列数:{' '}
				<InputNumber
					min="1"
					max="4"
					value={counter}
					onChange={value => dispatch({ type: Types.UPDATA, number: value })}
				/>
			</div>
			<List
				bordered
				style={{ width: 900 }}
				grid={{ column: counter }}
				header={`todos列表(列数:${counter})`}
				dataSource={todos}
				renderItem={item => (
					<List.Item>
						<Card>{item}</Card>
					</List.Item>
				)}
			/>
		</Space>
	);
};

export default ReduxDemo;
