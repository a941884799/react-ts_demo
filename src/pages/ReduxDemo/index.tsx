/** @format */
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Types, add} from '@store/actions/common'
import {Space, Button, DatePicker} from 'antd'

const ReduxDemo = () => {
  const dispatch = useDispatch()
  const todos: [] = useSelector((store: any) => store.todos)
  const counter: number = useSelector((store: any) => store.counter)
  console.log('Home 重新渲染')
  return (
    <Space direction="vertical">
      <Button type="primary" onClick={() => dispatch({type: Types.ADD_TODO, text: todos.length})}>
        ADD_TODO
      </Button>
      <Button type="primary" onClick={() => dispatch(add)}>
        add counter
      </Button>
      <DatePicker showTime />
      <h4>todos:{todos.map(i => i)}</h4>
      <h4>counter: {counter} </h4>
    </Space>
  )
}

export default ReduxDemo
