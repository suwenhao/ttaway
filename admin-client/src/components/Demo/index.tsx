import React, { Component, Fragment } from 'react'
import {
  Route
} from 'react-router-dom'

import About from '../../pages/demo/About'
import Redux from '../../pages/demo/Redux'
import Context from '../../pages/demo/Context'

export default class index extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Context}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/Redux" component={Redux}></Route>
      </Fragment>
    )
  }
}
