import React, { Component, Fragment } from 'react'
// router
import { Switch, Route, Redirect } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../reduxs/actions/globalAction'
import {IState as IGlobalState} from '../../reduxs/reducers/globalReducer'
import { ActionModel } from '../../types'
// antd
import { Layout } from 'antd'
// css
import './admin.less'
//组件
// auth
import Auth from '../../components/Auth'
// common
import PublicHeader from '../../components/Header'
import LeftNav from '../../components/LeftNav'
//page
import Home from '../home/home'
import Category from '../category/category'
import ShopList from '../shoplist/shoplist'
import ShopInfo from '../shopinfo/shopinfo'
import AddEditShop from '../addeditshop/addeditshop'
import FoodList from '../foodlist/foodlist'
import AddEditFood from '../addeditfood/addeditfood'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Content } = Layout;

interface IProps extends IGlobalState {
  changeCollapsed: ActionModel<actions.ICollapsed>;
  changeMobile: ActionModel<actions.IMobile>;
}
interface IState extends IGlobalState {}

class Admin extends Component<IProps, IState> {
  // 视口改变大小的时候
  public calcResize = () => {
    let { changeCollapsed, changeMobile } = this.props
    let ww = document.documentElement.clientWidth
    if (ww < 768) {
      changeCollapsed({
        collapsed: true
      })
      changeMobile({
        mobile: true
      })
    } else {
      if (ww > 1200) {
        changeCollapsed({
          collapsed: false
        })
      } else{
        changeCollapsed({
          collapsed: true
        })
      }
     
      changeMobile({
        mobile: false
      })
    }
  }
  // close
  public closeCollapsed = () => {
    let { changeCollapsed, mobile } = this.props
    if (mobile) {
      changeCollapsed({
        collapsed: true
      })
    }
  } 
  private toggle = () => {
    let { changeCollapsed, collapsed } = this.props
    changeCollapsed({
      collapsed: !collapsed
    })
  }
  componentDidMount () {
    this.calcResize()
    window.addEventListener('resize', () => {
      this.calcResize()
    })
  }
  render() {
    let collapsed = this.props.collapsed!
    let mobile = this.props.mobile!
    return (
      <Fragment>
        <Auth/>
        <Layout style={{ height: '100%' }}>
          <LeftNav mobile={mobile} collapsed={collapsed} closeCollapsed={this.closeCollapsed}></LeftNav>
          <Layout className={mobile && collapsed === false ? 'bofore' : ''} style={{ marginLeft: collapsed ? mobile ? 0 :80 : 200, transition: ' all 0.2s' }}>
            <div className="fixed" onClick={this.closeCollapsed}></div>
            <PublicHeader mobile={mobile} collapsed={collapsed} toggle={this.toggle}></PublicHeader>
            <Content style={{ overflow: 'hidden', marginTop: '50px' }}>
              <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/category" component={Category}/>
                <Route exact path="/shoplist" component={ShopList}/>
                <Route exact path="/shopinfo/:_id" render={(props: any) => {
                  return (
                    <ShopInfo {...props}/>
                  )
                }} />
                <Route exact path="/addshop" render={(props: any) => {
                  return (
                    <AddEditShop {...props} state={{ type: 'add' }} />
                  )
                }} />
                <Route exact path="/editshop" render={(props: any) => {
                  return (
                    <AddEditShop {...props} state={{ type: 'edit' }}/>
                  )
                }} />
                <Route exact path="/lookshop" render={(props: any) => {
                  return (
                    <AddEditShop {...props} state={{ type: 'look' }} />
                  )
                }} />
                <Route exact path="/foodlist" component={FoodList} />
                <Route exact path="/addfood/:_id" render={(props: any) => {
                  return (
                    <AddEditFood {...props} state={{ type: 'add' }} />
                  )
                }} />
                <Route exact path="/editfood/:_id/:shop_id" render={(props: any) => {
                  return (
                    <AddEditFood {...props} state={{ type: 'edit' }} />
                  )
                }} />
                <Route exact path="/lookfood/:_id" render={(props: any) => {
                  return (
                    <AddEditFood {...props} state={{ type: 'look' }} />
                  )
                }} />
                <Route exact path="/user" component={User}/>
                <Route exact path="/role" component={Role}/>
                <Route exact path="/bar" component={Bar}/>
                <Route exact path="/line" component={Line}/>
                <Route exact path="/pie" component={Pie}/>
                <Redirect to="/home"></Redirect>
              </Switch>
            </Content>
            <Footer style={{ height: '40px', lineHeight: '40px',padding: 0, background: '#fff', borderTop: '1px solid #ddd' }}>Footer</Footer>
          </Layout>
        </Layout>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.global.collapsed,
    mobile: state.global.mobile
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)