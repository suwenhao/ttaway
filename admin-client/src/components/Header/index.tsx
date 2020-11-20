import React, {Component} from 'react'
// antd components
import { Layout, Icon, Button, Modal } from 'antd'
// redux
import {connect} from 'react-redux'
// router
import {withRouter, RouteComponentProps} from 'react-router-dom'
// class 
import StorageModel from '../../utils/storage'
// api
import {reqWeather} from '../../api'
// css
import './header.less'
// types
import { IManageInfo } from '../../reduxs/actions/globalAction'

const Storage = new StorageModel()
const { Header } = Layout;

type IPorps = RouteComponentProps & {
  mobile: boolean;
  collapsed: boolean;
  toggle: any;
  manage_info: IManageInfo;
}
interface IWeatherData {
  [propsName: string]: string;
}
interface IState{
  weatherDate: string;
  weatherResult?: IWeatherData | null;
}

class PublicHeader extends Component<IPorps, IState>{
  state = {
    weatherDate: '',
    weatherResult: null
  }
  // 获取用户信息
  public get userInfo () {
    return this.props.manage_info
  }
  // 获取天气信息
  public getreqWather = async () => {
    let data = await reqWeather({location: '广州'}) as any
    this.setState({
      weatherDate: data.date,
      weatherResult: data.result[0].weather_data[0]
    }, () => {
      // console.log(this.state.weatherResult)
    })
  }
  // 退出登录
  public logout = () => {
    let self = this
    Modal.confirm({
      title: '提示',
      content: '确定要退出登录吗？',
      onOk() {
        Storage.clear()
        self.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  componentDidMount () {
    this.getreqWather()
  }
  // render
  public render () {
    let weather_data = this.state.weatherResult!
    return (
      <Header style={{
        padding: '0 20px',
        background: '#fff',
        position: 'fixed',
        transition: ' all 0.2s',
        zIndex: 1,
        width: this.props.mobile ? this.props.collapsed ? '100vw' : 'calc(100vw - 200px)' :  this.props.collapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)', 
        height: '50px',
        lineHeight: '50px'
      }}>
        <div className="header-top">
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          />
          {
            this.props.mobile && !this.props.collapsed ?
            ''
            :
            <div className="header-top-right">
              <div className="weather">
                {
                  !this.props.mobile?
                  <span className="time">
                    {this.state.weatherDate} | {weather_data?weather_data['temperature']:''}
                  </span>
                  :
                  ''
                }
                <img src={weather_data?weather_data['dayPictureUrl']:''} alt="" title={weather_data?weather_data['date']:''}/>
                {
                  !this.props.mobile?
                  <span className="time">
                    <span title={weather_data?weather_data['wind']:''}>{weather_data?weather_data['weather']:''}</span>
                  </span>
                  :
                  ''
                }
              </div>
              <div className="info">
                <span>欢迎，{this.userInfo.manage_name}</span>
                <Button onClick={this.logout} type="primary" size="small">退出</Button>
              </div>
            </div>
          }
        </div>
      </Header>
    )
  }
}

export default connect(({global}: any) => ({
  manage_info: global.manage_info
}))(withRouter(PublicHeader))