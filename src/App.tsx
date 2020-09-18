/** @format */

import React, {useEffect} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Types, add} from '@store/actions/common'
import {history} from './index'
import './store'

const App = (): JSX.Element => {
  useEffect(() => {
    // 监听路由变化，跳转Users页面时取消监听
    const unlisten = history.listen(location => {
      console.log(`当前地址为${location.pathname}`)
      if (location.pathname === '/users') {
        unlisten()
        console.log('取消监听路由变化')
      }
    })
  }, [])
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/" component={() => <Home />}></Route>
      </Switch>
    </div>
  )
}

function Home() {
  const dispatch = useDispatch()
  const todos: [] = useSelector(store => store.todos)
  const counter: number = useSelector(store => store.counter)
  console.log('Home 重新渲染')
  return (
    <>
      <h2>Home</h2>
      <h4 onClick={() => dispatch({type: Types.ADD_TODO, text: todos.length})}>todos:{todos.map(i => i)}</h4>
      <h4 onClick={() => dispatch(add)}>counter: {counter} </h4>
    </>
  )
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

export default App
