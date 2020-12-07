/** @format */
/**
 * WangLonggang 的 ReduxDemo
 * */
import React, { ReactNode } from 'react';
import { Space, Input, InputNumber, List, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '@store/actions/common';

const ReduxDemo = (): ReactNode => {
  const dispatch = useDispatch();
  const todos: [] = useSelector((store: unknown) => store.todos);
  const counter: number = useSelector((store: unknown) => store.counter);
  return (
    <Space direction="vertical">
      <Input.Search
        size="large"
        placeholder="请输入todos列表要添加的内容"
        style={{ width: 500 }}
        onSearch={value => dispatch({ type: ActionTypes.ADD_TODO, text: value })}
        enterButton="添加"
      />
      <div>
        列表列数:{' '}
        <InputNumber
          min="1"
          max="4"
          value={counter}
          onChange={value => dispatch({ type: ActionTypes.UPDATA, number: value })}
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
