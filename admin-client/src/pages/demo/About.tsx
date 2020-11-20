import React, { Component, Fragment } from 'react'

// Fragment类似vue 的template标签
const LiItem = () => (
  <Fragment>
    <li>哈哈</li>
    <li>你好</li>
  </Fragment>
)

export default class About extends Component {
  render() {
    return (
      <div>
        <h4>About Page</h4>
        <ul>
          <LiItem></LiItem>
        </ul>
      </div>
    )
  }
}
