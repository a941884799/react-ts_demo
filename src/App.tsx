/** @format */

import React, {useEffect} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ActionTypes} from '@store/actions'
import {history} from './index'
import './store'
console.log(_, name, age, globalObj, boolean_true)
const App = (): JSX.Element => {
  useEffect(() => {
    const unlisten = history.listen(location => {
      if (location.pathname === '/users') unlisten()
      console.log(location)
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
        <Route path="/" component={() => <Home {...{1: '123'}} />}></Route>
      </Switch>
    </div>
  )
}

export default App

function Home() {
  const dispatch = useDispatch()
  const todos: [] = useSelector(store => store.todos)
  console.log(todos)
  return <h2 onClick={() => dispatch({type: ActionTypes.ADD_TODO, text: todos.length})}>Home{todos.map(i => i)}</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}
