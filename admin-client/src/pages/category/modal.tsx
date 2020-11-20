import React, { Component } from 'react'
import { Modal, Input, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

interface IProps extends FormComponentProps {
  visible: boolean;
  cates: any;
  category_name: string;
  parentId: string;
  type: string;
  child: boolean;
  reset: () => void;
  onCreate: () => void;
  onCancel: () => void;
}

class ModalComponent extends Component<IProps> {
  state= {
    categoryRules: [
      { required: true, whitespace: true, message: '分类名不能为空!' },
    ]
  }
  
  render() {
    const { visible, onCancel, onCreate, form, category_name, type } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        title={type === 'add'? '添加分类': '修改分类'}
        maskClosable={false}
        visible={visible}
        onOk={onCreate}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="分类名称">
            {getFieldDecorator('category_name', {
              initialValue: category_name ? category_name : '',
              rules: this.state.categoryRules,
            })(
              <Input placeholder="输入分类名称"/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const CollectionCreateForm = Form.create<IProps>({ name: 'modal' })(ModalComponent)
export default CollectionCreateForm as any
