/** @format */

import React from 'react'
import {render} from 'react-dom'
import {createBrowserHistory} from 'history'
import {Router, Switch, Route, Link} from 'react-router-dom'
import '@src/global.scss'
import {globalVar} from '@src/utils'

// 注册全局变量，解决按需引入polyfill的缺陷
globalVar()

export const browserHistory = createBrowserHistory()
const listen = browserHistory.listen(params => {
  if (params?.pathname === '/users') {
    console.log('users', params)
    listen()
    return
  }
  console.log(listen, params)
})
console.log(browserHistory)
render(
  <Router history={browserHistory}>
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
        <Route path="/" component={Home}></Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root'),
)
function Home(props: Record<string, unknown>) {
  return <h2>Home</h2>
}

function About({history}: Record<string, unknown>) {
  console.log(history, 'about')
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}
