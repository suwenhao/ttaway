import React, { Component } from 'react'
import {
  Form,
  Input,
  Tag
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'

const Item = Form.Item

type IProps = FormComponentProps & {
  shop_id: any;
  data: any[];
  onRef: (ref: any) => void;
}
/*
添加角色的form组件
 */
class FoodCate extends Component<IProps> {
  public state = {}
  public componentDidMount() {
    this.props.onRef(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { data } = this.props
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <Form className="add-form">
        <Item className="form-itme" label='食品种类' {...formItemLayout}>
          {
            data.map((item: any) => {
              return (
                <Tag key={item._id} color="#108ee9">{item.name}</Tag>
              )
            })
          }
        </Item>
        <Item className="form-itme" label='种类名称' {...formItemLayout}>
          {
            getFieldDecorator('name',{
              rules: [
                {required: true, message: '名称不能为空'}
              ]
            })(
              <Input placeholder='请输入种类名称' />
            )
          }
        </Item>
        <Item className="form-itme" label='种类描述' {...formItemLayout}>
          {
            getFieldDecorator('description')(
              <Input placeholder='请输入种类描述' />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create<IProps>()(FoodCate)
