import React, {Component} from 'react'
//router
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'
// redux
import {connect} from 'react-redux'
//config
import {ds, menuList} from '../../config'
//antd
import { Layout, Menu, Icon } from 'antd'
//css
import './left-nav.less'
// types
import { IManageInfo } from '../../reduxs/actions/globalAction'
import { IMenu } from '../../config/menu'

//component
const { Sider } = Layout
const { SubMenu } = Menu

// interface
type IProps = RouteComponentProps & {
  mobile: boolean;
  collapsed: boolean;
  closeCollapsed: () => void;
  manage_info: IManageInfo;
}

// current component
class LeftNav extends Component<IProps> {
  public openKey: string = ''
  public menuNodes: any
  // 判断当前登陆用户对item是否有权限
  private hasAuth = (item: any) => {
    const {path, isPublic} = item
    const {root, role} = this.props.manage_info
    const menus = role.menus
    // console.log(menus)
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: path有没有menus中
     */
    if (root || isPublic || menus.indexOf(path) !== -1) {
      return true
    } else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child: any) =>  menus.indexOf(child.path)!==-1)
    }
    return false
  }
  // 动态生成菜单
  private getMenuNodes = (menuList: IMenu[], pathname: string) => {
    return menuList.reduce((pre: any, item: any) => {
      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (this.hasAuth(item)) {
        // 向pre添加<Menu.Item>
        if(!item.children) {
          pre.push((
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find((cItem: any) => pathname.indexOf(cItem.path)===0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.path
          }
          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.path}
              title={
                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
              }
            >
              {this.getMenuNodes(item.children, pathname)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }
  componentWillMount () {
    const {pathname} = this.props.location
    const pathas = pathname.substring(1).split('/')
    const pathactive = '/' + pathas[0]
    this.menuNodes = this.getMenuNodes(menuList, pathactive)
  }
  public render () {
    const {pathname} = this.props.location
    const pathas =  pathname.substring(1).split('/')
    const pathactive = '/' + pathas[0]
    const openKey = this.openKey
    return (
      <Sider theme={ds.theme} collapsedWidth={this.props.mobile ? 0 : this.props.collapsed ? 80 : 200} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="lefr-nav-logo">
          <Link to="/">
            <img src={require('../../assets/images/logo.svg')} alt=""/>
            <span style={{
              color: ds.color[ds.theme],
              width:  this.props.mobile ? 64 : this.props.collapsed ? 0 : 64,
              transition: ' all 0.4s'
            }}>团团外卖后台管理</span>
          </Link>
        </div>
        <Menu theme={ds.theme} defaultOpenKeys={[openKey]} selectedKeys={[pathactive]} mode="inline">
          {
            this.menuNodes
          }
        </Menu>
      </Sider>
    )
  }
}

export default connect(({global}: any) => ({
  manage_info: global.manage_info
}))(withRouter(LeftNav))