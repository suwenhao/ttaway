import React, {Component} from 'react'
import {
  Form,
  Input
} from 'antd'
import './role.less'
import { FormComponentProps } from 'antd/lib/form'

const Item = Form.Item

type IProps = FormComponentProps & {
  setForm?: (form: any) => void;
  role_name?: string;
}
/*
添加角色的form组件
 */
class AddForm extends Component<IProps> {
  componentWillMount () {
    let setForm = this.props.setForm!
    setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { role_name } = this.props
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <Form className="add-form">
        <Item className="form-itme" label='角色名称' {...formItemLayout}>
          {
            getFieldDecorator('role_name', {
              initialValue: role_name,
              rules: [
                {required: true, message: '角色名称必须输入'}
              ]
            })(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create<IProps>()(AddForm)
