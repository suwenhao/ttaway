import React, { Component } from 'react'
// antd
import { 
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Radio,
  Modal,
  Button,
  message
} from 'antd'
// component
import PictureWall from '../../components/PictureWall'
import AddSpec from '../../components/addSpec'
// redux
import { connect } from 'react-redux'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
// router
import { RouteComponentProps } from 'react-router-dom'
// api
import {
  reqShopFoodCateList,
  reqAddFood,
  reqFoodInfo,
  reqEditFood
} from '../../api'
// uuid
import uuidv1 from 'uuid/v1'
// type
import { FormComponentProps } from 'antd/lib/form'
// css
import './addeditfood.less'

const Item = Form.Item
const Option = Select.Option
const { TextArea } = Input;
const defaultSpecs = [
  {
    id: uuidv1(),
    name: '默认',
    sub: [
      {
        id: uuidv1(),
        spec: '默认',
      }
    ]
  }
]

type IProps = FormComponentProps & RouteComponentProps & {
  mobile: boolean;
  backTop?: any;
  state?: any;
}
class AddEditFood extends Component<IProps> {
  public foodImgRef: any;
  public formRef: any;
  public state = {
    loading: false,
    name: '',
    activity: '',
    foodcate_id: null,
    foodcate_data: [],
    description: '',
    discount: 10,
    attributes: [],
    specType: 1,
    specs: defaultSpecs,
    specifications: [],
    specShow: false,
    specIndex: 0,
    image_path: '',
    price: 20,
    packing_fee: 0,
    submitLoad: false
  }
  private setSubmitLoad = (submitLoad: boolean = true) =>{
    this.setState({
      submitLoad
    })
  }
  private verifySpecs = (values: any) => {
    let { specType, specs } = this.state
    let { packing_fee, price } = values
    console.log(specs)
    if (specType === 1) {
      // @ts-ignore
      specs[0]['sub'][0].packing_fee = packing_fee
      // @ts-ignore
      specs[0]['sub'][0].price = price
      return specs
    } else {
      let nameKey = false
      let newSpecs = specs.filter((item: any) => {
        return item.sub.length>0
      })
      newSpecs.forEach((item: any) => {
        if (item.name === '') {
          nameKey = true
        }
      })
      if (nameKey) {
        message.warning('规格组名不能为空')
        return false
      }
      newSpecs.forEach((item: any) => {
        item.sub.forEach((jtem: any) => {
          jtem.packing_fee = packing_fee
          jtem.price = price
        })
      })
      // console.log(newSpecs)
      return newSpecs
    }
  }
  private handleSubmit = async (e: any) => {
    e.preventDefault();
    let {form, state: { type }}: any = this.props
    let { specifications }: any = this.state
    this.setSubmitLoad()
    // @ts-ignore
    let { _id } = this.props.match.params
    form.validateFields(async (err: any, values: any) => {
      if (!err) {
        values.image_path = this.foodImgRef.getImg()
        let { 
          foodcate_id,
          name,
          activity,
          description,
          discount,
          image_path,
          attributes,
          packing_fee,
          price,
        } = values
        if (!packing_fee && packing_fee !== 0) {
          message.warning('包装费不能为空')
          return false
        }
        if (!price && price !== 0) {
          message.warning('原价不能为空')
          return false
        }
        if (image_path === '') {
          message.warning('请上传食品图片')
          return false
        }
        let params: any = {
          foodcate_id,
          
          name,
          activity,
          description,
          discount,
          image_path,
          attributes,
          packing_fee,
          price,
        }
       
        let verifySpecs = this.verifySpecs(values)
        if (!verifySpecs) {
          return false
        } else {
          params.specs = verifySpecs.length === 0 ? defaultSpecs : verifySpecs
        }
        console.log(params)
        if (type === 'add') {
          params.shop_id = _id
          let { data } = await reqAddFood(params)
          // console.log(data)
          if (data.erron === 0) {
            message.success('添加成功')
            this.setSubmitLoad(false)
            setTimeout(() => {
              this.props.history.push('/foodlist')
            }, 1000)
          }
        } else {
          // @ts-ignore
          let { shop_id } = this.props.match.params
          params._id = _id
          params.shop_id = shop_id
          params.specifications = specifications
          let { data } = await reqEditFood(params)
          // console.log(data)
          if (data.erron === 0) {
            message.success('修改成功')
            this.setSubmitLoad(false)
            setTimeout(() => {
              this.props.history.push('/lookfood/'+_id)
            }, 1000)
          }
        }
      } else {
        // console.log(err)
        this.props.backTop()
        if (err.name) {
          message.warning(err.name.errors[0]['message'])
        }
        this.setSubmitLoad(false)
      }
    })
    return false;
  }
  private setFoodInfo = async () => {
    // @ts-ignore
    let { _id } = this.props.match.params
    let {data: {data: {
      name,
      description,
      discount,
      activity,
      attributes,
      specifications,
      specs,
      image_path,
      price
    }}} = await reqFoodInfo({
      _id
    })
    let specsKey: any = {}
    specs.forEach((item: any) => {
      if (specsKey[item.specs_id]) {
        specsKey[item.specs_id].push(item)
      } else {
        specsKey[item.specs_id] = []
        specsKey[item.specs_id].push(item)
      }
    })
    let specsArr: any = Object.keys(specsKey).map((item: any)=>{
      return {
        id: item,
        name: specsKey[item][0].specs_name,
        sub: specsKey[item].map((jtem: any) => {
          return {
            id: jtem._id,
            spec: jtem.name
          }
        })
      }
    })
    console.log(specsArr)
    this.setState({
      name,
      description,
      discount,
      activity: activity?activity:'',
      attributes,
      price,
      image_path,
      specifications,
      specs: specsArr,
      specType: specifications.length>1?2:1,
    })
  }
  private resetSpecs = (cb?: any) => {
    this.setState({
      specs: [{
        id: uuidv1(),
        name: '默认',
        sub: [
          {
            id: uuidv1(),
            spec: '默认',
          }
        ]
      }],
      price: 20,
      packing_fee: 0,
    }, () => {
      cb&&cb()
    })
  }
  private getShopFoodCateList = async () => {
    // @ts-ignore
    let { _id } = this.props.match.params
    try {
      let { data } = await reqShopFoodCateList({ shop_id: _id })
      console.log(data)
      if (data.erron === 0) {
        this.setState({
          foodcate_data: data.data,
          foodcate_id: data.data.length > 0 ? data.data[0]._id : null
        })
      }
    } catch (error) { }
  }
  private addSpec = async () => {
    let { form } = this.formRef.props
    form.validateFields(async (err: any, values: any) => {
      if (!err) {
        let { specIndex } = this.state
        let newSpecs = [...this.state.specs]
        newSpecs[specIndex]['sub'].push({
          ...values,
          id: uuidv1()
        })
        this.setState({
          specs: newSpecs,
          specShow: false
        }, () => {
          form.resetFields()
        })
      }
    })
  }
  public componentDidMount () {
    this.getShopFoodCateList()
    let {state: { type }}: any = this.props
    if (type !== 'add') {
      this.setFoodInfo()
    }
  }
  render() {
    let { form: { getFieldDecorator }, mobile, state: { type } } = this.props
    let {
      loading,
      name,
      foodcate_id,
      foodcate_data,
      description,
      discount,
      activity,
      attributes,
      specType,
      image_path,
      specs,
      specShow,
      packing_fee,
      price,
      submitLoad,
    } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } }
    const tailFormItemLayout = { wrapperCol: mobile ? { span: 22 } : { span: 18, offset: 4 } }
    return (
      <div className="add-edit-food">
        <Card loading={loading} title={type === 'add' ? '增加食品' : type === 'edit' ? '修改食品' : '查看食品'}>
          <Row>
            <Col span={mobile ? 24 : 18}>
              <Form onSubmit={this.handleSubmit} className="add-form">
                <Item className="form-itme" label='食品种类' {...formItemLayout}>
                  {
                    getFieldDecorator('foodcate_id', {
                      initialValue: foodcate_id,
                      rules: [
                        { required: true, message: '必须选择种类'}
                      ]
                    })(
                      <Select disabled={type === 'look' ? true : false}>
                        {
                          foodcate_data.map((item: any) => {
                            return (<Option value={item._id} key={item._id}>{item.name}</Option>)
                          })
                        }
                      </Select>
                    )
                  }
                </Item>
                <Item className="form-itme" label='食品名称' {...formItemLayout}>
                  {
                    getFieldDecorator('name', {
                      initialValue: name,
                      rules: [
                        { required: true, message: '食品名称必须输入' }
                      ]
                    })(
                      <Input disabled={type === 'look' ? true : false} placeholder='请输入食品名称' />
                    )
                  }
                </Item>
                <Item className="form-itme" label='食品活动' {...formItemLayout}>
                  {
                    getFieldDecorator('activity',
                    {
                      initialValue: activity
                    })(
                      <Input disabled={type === 'look' ? true : false} placeholder='请输入食品活动' />
                    )
                  }
                </Item>
                <Item className="form-itme" label='食品描述' {...formItemLayout}>
                  {
                    getFieldDecorator('description', {
                      initialValue: description
                    })(
                      <TextArea rows={4} disabled={type === 'look' ? true : false} placeholder='请输入食品详情' />
                    )
                  }
                </Item>
                <Item className="form-itme" label='食品折扣' {...formItemLayout}>
                  {
                    getFieldDecorator('discount', {
                      initialValue: discount,
                      rules: [
                        { required: true, message: '食品折扣必须输入' }
                      ]
                    })(
                      <InputNumber step={0.1} min={0} max={10} disabled={type === 'look' ? true : false} placeholder='食品折扣' />
                    )
                  }
                </Item>
                <Item className="form-itme" label="食品图片" {...formItemLayout}>
                  <PictureWall 
                    disabled={type === 'look' ? true : false}
                    imageName={image_path}
                    onRef={(ref: any) => { this.foodImgRef = ref }}
                  ></PictureWall>
                </Item>
                <Item className="form-itme" label='食品特点' {...formItemLayout}>
                  {
                    getFieldDecorator('attributes', {
                      initialValue: attributes
                    })(
                      <Select disabled={type === 'look' ? true : false} mode="multiple">
                        <Option value="招牌">招牌</Option>
                        <Option value="新品">新品</Option>
                      </Select>
                    )
                  }
                </Item>
                <Item className="form-itme" label='食品规格' {...formItemLayout}>
                  <Radio.Group disabled={type === 'look' ? true : false} onChange={(e: any) => {
                    this.resetSpecs(() => {
                      this.setState({
                        specType: e.target.value,
                      });
                    })
                  }} value={specType}>
                    <Radio disabled={type === 'look' ? true : false} value={1}>单规格</Radio>
                    <Radio disabled={type === 'look' ? true : false} value={2}>多规格</Radio>
                  </Radio.Group>
                  <Item className="form-itme" {...formItemLayout}>
                    {
                      getFieldDecorator('packing_fee', {
                        initialValue: packing_fee,
                        rules: [
                          { required: true, message: '包装费必须输入' }
                        ]
                      })(
                        <InputNumber
                          min={0}
                          disabled={type === 'look' ? true : false}
                          placeholder='包装费'
                        />
                      )
                    }
                    <span>&nbsp;&nbsp;包装费</span>
                  </Item>
                  <Item className="form-itme" {...formItemLayout}>
                    {
                      getFieldDecorator('price', {
                        initialValue: price,
                        rules: [
                          { required: true, message: '原价必须输入' }
                        ]
                      })(
                        <InputNumber
                          min={0}
                          disabled={type === 'look' ? true : false}
                          placeholder='原价'
                        />
                      )
                    }
                    <span>&nbsp;&nbsp;原价</span>
                  </Item>
                  {
                    specType === 1 ?
                    <></>
                    :
                    <div className="specs-wrapper">
                      {
                        specs.map((item: any, index: number) => {
                          return (
                            <div key={item.id} className="spec-box">
                              <div className="spec-form">
                                <Input disabled={type === 'look' ? true : false} size="small" value={item.name} placeholder="请输入规格组名" onChange={(e: any) => {
                                   let newSpecs = [...this.state.specs]
                                   newSpecs[index].name = e.target.value
                                   this.setState({
                                     specs: newSpecs
                                   })
                                }}></Input>
                                <Button disabled={type === 'look' ? true : false} size="small" type="primary" onClick={() => {
                                  this.setState({
                                    specShow: true,
                                    specIndex: index
                                  })
                                }}>添加规格</Button>
                                {
                                  index === 0?
                                  <></>
                                  :
                                  <Button disabled={type === 'look' ? true : false} size="small" className="delete-btn" type="danger" onClick={() => {
                                    let newSpecs = [...this.state.specs]
                                    newSpecs.splice(index, 1)
                                    this.setState({
                                      specs: newSpecs
                                    })
                                  }}>删除</Button>
                                }
                              </div>
                              <div className="specs-table" style={{width: '100%', overflowX: 'auto'}}>
                                <table className="a-table">
                                  <thead>
                                    <tr>
                                      <th>规格</th>
                                      <th>操作</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      item.sub.map((jtem: any, jndex: number) => {
                                        return (
                                          <tr key={jtem.id}>
                                            <td>{jtem.spec}</td>
                                            <td><Button disabled={type === 'look' ? true : false} size="small" type="danger" onClick={() => {
                                              let newSpecs = [...this.state.specs]
                                              newSpecs[index]['sub'].splice(jndex, 1)
                                              this.setState({
                                                specs: newSpecs
                                              })
                                            }}>删除</Button></td>
                                          </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="plus-btn" onClick={() => {
                        let newSpecs = [...this.state.specs]
                        newSpecs.push({
                          id: uuidv1(),
                          name: '--',
                          sub: []
                        })
                        this.setState({
                          specs: newSpecs
                        })
                      }}>
                        ＋
                      </div>
                    </div>
                  }
                </Item>
                <Item className="form-itme" {...tailFormItemLayout}>
                  {
                    type === 'look' ?
                      <></>
                      :
                      <Button style={{ marginRight: 10 }} disabled={submitLoad} type="primary" htmlType="submit">
                        {
                          type === 'add' ? '提交' : '修改'
                        }
                      </Button>
                  }
                  <Button style={{ marginRight: 10 }} type="default" onClick={() => {
                    this.props.history.push('/foodlist')
                  }}>
                    返回
                  </Button>
                </Item>
              </Form>
            </Col>
          </Row>
        </Card>
        <Modal
          width={500}
          title="增加分类"
          visible={specShow}
          onOk={this.addSpec}
          onCancel={() => {
            this.setState({
              specShow: false
            })
          }}
        >
          <AddSpec onRef={(ref: any) => this.formRef = ref}/>
        </Modal>
        <div style={{ height: 20 }}></div>
      </div>
    );
  }
}

// 面包屑
const breadcrumb: IBreadcrumb[] = [
  {
    key: 0,
    link: false,
    text: '首页',
    path: '/home'
  },
  {
    key: 1,
    link: false,
    text: '数据管理',
    path: ''
  },
  {
    key: 2,
    link: true,
    text: '餐馆列表',
    path: '/shoplist'
  },
  {
    key: 3,
    link: false,
    text: '食品管理',
    path: ''
  },
]

export default connect(({ global }: any) => ({
  mobile: global.mobile,
}))(BaseComponent(Form.create<IProps>()(AddEditFood), breadcrumb))
