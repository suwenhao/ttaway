import React, { Component } from 'react'
// antd
import { Breadcrumb } from 'antd'
// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalAction from '../reduxs/actions/globalAction'
//router
import { withRouter, Link } from 'react-router-dom'
// class function
import StorageModel, { MANAGE_INFO } from '../utils/storage'
// api
import { reqUserUpdateInfo } from '../api'
//css
import './base.less'

const Storage = new StorageModel()

export interface IBreadcrumb {
  key: number;
  link?: boolean;
  text: string;
  path: string;
}

export default (WrapperComponent: any, breadcrumb: IBreadcrumb[]) => {
  class BaseComponent extends Component<any, any> {
    public baseRef: any;
    public componentDidMount() {
      this.updateUserInfo()
      this.authPath()
      this.baseRef.addEventListener('scroll', (e: any) => {
        this.handleScroll(e)
      })
    }
    public state = {
      backtop: false
    }
    public authPath = () => {
      let { role: { menus }, root } = this.props.manage_info!
      let pathname = this.props.location.pathname!
      let push = this.props.history.push!
      if (!root) {
        if (menus.indexOf(pathname) === -1) {
          // console.log(this.props)
          push('/home')
        }
      }
    }
    public updateUserInfo = async (cb?: any) => {
      try {
        let { data } = await reqUserUpdateInfo({ _id: Storage.get(MANAGE_INFO).manage_id})
        if (data.erron === 0) {
          let manage_info = {
            manage_name: data.data.username,
            manage_id: data.data._id,
            email: data.data.email,
            root: data.data.root,
            role_id: data.data.role_id ? data.data.role_id : '',
            role: {
              menus: data.data.menus ? data.data.menus : []
            },
            phone: data.data.phone,
          }
          // 保存在localStorage
          Storage.set(MANAGE_INFO, manage_info)
          // 同步到redux
          this.props.changeManageInfo(manage_info)
          cb && cb()
        }
      } catch (error) {}
    }
    public handleScroll = (e: any) => {
      if (e.currentTarget.scrollTop > 400) {
        this.setState({
          backtop: true
        })
      } else {
        this.setState({
          backtop: false
        })
      }
    }
    public backTop = () => {
      function startMove(obj: any, iTarget: number) {
        let timer: any = null;
        clearInterval(timer);
        timer = setInterval(function () {
          let iSpeed = (iTarget - obj.scrollTop) / 3;
          // Math.ceil() 向上取整   Math.floor() 向下取整 
          iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

          if (obj.scrollTop === iTarget) {
            clearInterval(timer);
          } else {
            obj.scrollTop = obj.scrollTop + iSpeed;
          }
        }, 10);
      }
      startMove(this.baseRef, 0)
    }
    render() {
      return (
        <div className="base" ref={(ref) => this.baseRef = ref}>
          <Breadcrumb className="breadcrumb">
            {
              breadcrumb.map((item: IBreadcrumb) => {
                return (
                  <Breadcrumb.Item key={item.key}>
                    {
                      item.link
                      ?
                      <Link to={item.path}>{item.text}</Link>
                      :
                      item.text
                    }
                  </Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
          {
            this.state.backtop?
            <div className="back-top" onClick={() => {
              this.backTop()
            }}>
              UP
            </div>
            :<></>
          }
          <div style={{margin: '0 20px'}}>
            <WrapperComponent backTop={this.backTop} {...this.props} />
          </div>
        </div>
      )
    }
  }
  return connect(
    ({ global }: any) => ({
      manage_info: global.manage_info
    }), (dispatch: any) => (bindActionCreators({ ...globalAction }, dispatch))
  )(withRouter(BaseComponent))
}