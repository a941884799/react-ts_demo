/** @format */

import React, {useEffect} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {history} from './index'

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

function Home(props: Types.obj) {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}
