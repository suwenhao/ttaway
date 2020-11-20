import React, { Component, FormEvent } from 'react'
// antd component
import { Form, Input, Checkbox, Button, Icon, message } from 'antd'
// redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as cookieAction from '../../reduxs/actions/cookieAction'
import * as globalAction from '../../reduxs/actions/globalAction'
// plugin
import Cookie from 'js-cookie'
// api
import { reqLogin } from '../../api'
// class function
import StorageModel, { MANAGE_TOKEN, MANAGE_INFO } from '../../utils/storage'
// css
import './login.less'

const Storage = new StorageModel()

interface IProps extends ILoginData{
  form: any;
  history: any;
  getCheckPass: () => void;
  changeManageInfo: (manage_info: globalAction.IManageInfo) => void;
}
interface ILoginData{
  username: string;
  password: string;
  remember: boolean;
}

const mapStateToProps = ({cookie}: any) => {
  return {
    username: cookie.username,
    password: cookie.password
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({...cookieAction, ...globalAction}, dispatch)
}
class Login extends Component<IProps, any>{
  //初始化
  componentDidMount () {
    // 从cookie中拿记住密码
    this.props.getCheckPass()
    if (Storage.get(MANAGE_TOKEN)) {
      this.props.history.replace('/')
    }
  }
  state = {
    //用户名校验
    usernameRules: [
      { required: true, whitespace: true, message: '用户名不能为空!' },
      { max: 12, min: 4, message: '用户名不能小于4位或大于12位!' },
      { pattern: /^[a-zA-Z][a-zA-Z0-9_]+$/, message: '字母开头，字母数字下划线!' },
    ],
    //密码校验
    passwordRules: [
      { required: true, whitespace: true, message: '密码不能为空!' },
      { max: 12, min: 4, message: '密码不能小于4位或大于12位!' },
      { pattern: /^[0-9a-zA-Z_]{1,}$/, message: '只能用字母、数字或者下划线组成!' },
    ]
  }
  // 请求登录
  private handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields( async (err: any, values: ILoginData) => {
      if (!err) {
        //记住密码
        if (values.remember) {
          Cookie.set('checkPass', JSON.stringify(values))
        }
        let { username, password } = values
        //请求
        let { data } = await reqLogin({ username, password})
        console.log(data)
        if (data.erron === 0) {
          Storage.set(MANAGE_TOKEN, data.data.token);
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
          message.success('登录成功')
          setTimeout(() => {
            this.props.history.replace('/home')
          }, 1000);
        }
      }
    });
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { username, password } = this.props
    return (
      <div className="login">
        <div className="login-box">
          <header className="login-header">
            <img src={require('../../assets/images/logo.svg')} alt=""/>
            <span>团团外卖后台管理</span>
          </header>
          <section className="login-content">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValue: password ? username : '',
                  rules: this.state.usernameRules,
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  initialValue: password ? password : '',
                  rules: this.state.passwordRules,
                })(
                  <Input.Password
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: password ? true : false,
                })(<Checkbox>记住密码</Checkbox>)}
              </Form.Item>
              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </section>    
        </div>
        <footer>
          Copyright  2019 技术支持
        </footer>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'login' })(Login))