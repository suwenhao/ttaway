import React, { Component } from 'react';
// router
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AsyncComponent from './base/lazy';
//page-components
// import Demo from './components/Demo'

// import Login from './pages/login/login'
// import Admin from './pages/admin/admin'
import NotFount from './pages/NotFount'
import './app.less'
// import MenuNav from './components/Demo/MenuNav'
const Login = AsyncComponent(() => import('./pages/login/login'));
const Admin = AsyncComponent(() => import('./pages/admin/admin'));



class App extends Component {
  public render() {
    return (
      <Router>
        {/* <MenuNav /> */}
        <Switch>
          {/* <Demo></Demo> */}
          <Route exact path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          <Route component={NotFount}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;