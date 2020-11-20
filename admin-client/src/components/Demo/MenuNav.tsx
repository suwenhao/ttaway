import React, {Component} from 'react'
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'
// antd-component
import { Menu } from 'antd'

type IProps = RouteComponentProps & {
  history?: any,
  match?: any,
  location?: any
}

class MenuNav extends Component<IProps> {
  private $path: any = {
    '/': 'context',
    '/about': 'about',
    '/redux': 'redux'
  }
  private get path () {return this.$path }
  public state = {
    current: []
  }
  private handleClick = (e: any) => {
    this.setState({
      current: [...e.key],
    })
  }
  public componentDidMount () {
    let pathname = this.props.location.pathname
    this.setState({
      current: [this.path[pathname]],
    })
  }
  public render () {
    return (
      <Menu mode="horizontal"
        selectedKeys={this.state.current}
        onClick={this.handleClick}>
        <Menu.Item key="context">
          <Link replace to="/">Context</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link replace to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="redux">
          <Link replace to="/redux">Redux</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(MenuNav)