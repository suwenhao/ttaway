import React, { PureComponent } from 'react'
// antd components
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

interface IProps {
  setForm: (form: any) => void; // 用来传递form对象的函数
  roles?: any;
  user?: any;
  form: any;
}

class UserForm extends PureComponent<IProps> {
  public state = {
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
  public componentWillMount () {
    this.props.setForm(this.props.form)
  }

  public render() {
    const {roles, user} = this.props
    const { getFieldDecorator } = this.props.form
    const { usernameRules, passwordRules } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <Form className="add-form" {...formItemLayout}>
        <Item className="form-itme" label='用户名'>
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: usernameRules
            })(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        {
          user._id ? null : (
            <Item className="form-itme" label='密码'>
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                  rules: passwordRules
                })(
                  <Input type='password' placeholder='请输入密码'/>
                )
              }
            </Item>
          )
        }
        <Item className="form-itme" label='手机号'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
            })(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item className="form-itme" label='邮箱'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
            })(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>

        <Item className="form-itme" label='角色'>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
            })(
              <Select>
                {
                  roles.map((role: any) => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create<IProps>()(UserForm)