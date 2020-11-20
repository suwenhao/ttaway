import React, { Component } from 'react'
import {
  Form,
  Input
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'

const Item = Form.Item

type IProps = FormComponentProps & {
  onRef: (ref: any) => void;
}
/*
添加角色的form组件
 */
class addSpec extends Component<IProps> {
  public state = {}
  public componentDidMount() {
    this.props.onRef(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <Form className="add-form">
        <Item className="form-itme" label='规格名称' {...formItemLayout}>
          {
            getFieldDecorator('spec',{
              rules: [
                {required: true, message: '规格名称不能为空'}
              ]
            })(
              <Input placeholder='请输入种类名称' />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create<IProps>()(addSpec)
