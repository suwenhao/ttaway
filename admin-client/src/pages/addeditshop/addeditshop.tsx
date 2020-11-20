import React, { Component } from 'react'
// antd
import { 
  Spin,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Cascader,
  Checkbox,
  message,
  Alert,
  InputNumber } from 'antd'
// plugin
import moment from 'moment';
import debounce from 'lodash/debounce';
// component
import $bmap from '../../components/Bmap'
import PictureWall from '../../components/PictureWall'
import ATable from './table'
// redux
import { connect } from 'react-redux'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
// router
import { RouteComponentProps } from 'react-router-dom'
// type
import { FormComponentProps } from 'antd/lib/form'
// config/api
import {
  reqCategory,
  reqAddressList,
  reqTraitList,
  reqPromotionList,
  reqAddShop,
  reqEditShop
} from '../../api'
// storage
import StorageModel, { EDIT_SHOP_INFO } from '../../utils/storage'
// css
import './addeditshop.less'

const Storage = new StorageModel()
const { Item } = Form
const { Option } = Select

type IProps = FormComponentProps & RouteComponentProps & {
  mobile: boolean;
  backTop?: any;
  state?: any;
}

class AddEditShop extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.handleSearch = debounce(this.handleSearch, 300);
  }
  componentWillMount () {
    if (this.props.state.type === 'add') {
      Storage.remove(EDIT_SHOP_INFO)
    }
  }
  public avatar: any;
  public timer: any;
  public businessLicense: any;
  public cateringServiceLicense: any;
  public tableRef: any;
  public state = {
    loading: true,
    _id: '',
    cateload: false,
    fetching: false, // 防抖
    city: '',
    name: '', //餐馆名字
    address: undefined, // 当前选择的地址
    address_data: [],  // search到的地址列表
    currentAddress: {}, // 当前选择的地址
    phone: undefined, // 餐馆联系电话
    introduction: '', // 餐馆简介
    slogan: '',  // 餐馆标语
    category: [],
    cates: [],
    cpid: null,
    cid: null,
    trait: undefined,
    trait_data: [],
    shipping_fee: [5, 0],
    starting_price: 20,
    startTime: '06:30',
    endTime: '20:30',
    promotion_data: [],
    promotion: undefined,
    promotion_info: '欢迎光临',
    avatar_image: '',
    business_license_image: '',
    catering_service_license_image: '',
    submitLoad: false
  }
  componentWillReceiveProps (nextProps: IProps) {
    // console.log('componentWillReceiveProps()', nextProps)
    const { state: {type} } = nextProps
    if (type === 'edit' ||  type === 'look') {
      let shopinfo = Storage.get(EDIT_SHOP_INFO)
      if (!shopinfo) {
        this.props.history.push('/shoplist')
        message.warning('找不到餐馆信息')
        return;
      }
    } else if (type === 'add') {
      this.setState({
        _id: '',
        fetching: false, // 防抖
        name: '', //餐馆名字
        address: undefined, // 当前选择的地址
        phone: undefined, // 餐馆联系电话
        introduction: '', // 餐馆简介
        slogan: '',  // 餐馆标语
        category: [],
        cpid: null,
        cid: null,
        shipping_fee: [5, 0],
        starting_price: 20,
        startTime: '06:30',
        endTime: '20:30',
        promotion_info: '欢迎光临',
        avatar_image: '',
        business_license_image: '',
        catering_service_license_image: '',
      })
    }
  }
  // 点击地址框搜索地址
  private handleSearch = async (value: string) => {
    let { city } = this.state
    let params = {
      query: value,
      region: city
    }
    this.setState({ address_data: [], fetching: true });
    let { data } = await reqAddressList(params)
    console.log(data)
    if (data.erron === 0) {
      console.log(data)
      let newData = data.data.map((item: any) => {
        let geohash = item.location.lat + ',' + item.location.lng
        let latitude = item.location.lat
        let longitude = item.location.lng
        return {
          value: item.address,
          text: item.address,
          geohash,
          latitude,
          longitude,
          id: item.id
        }
      })
      this.setState({
        address_data: newData,
        fetching: false
      })
    } else {
      message.warning(data.message)
    }
  }
  // 选择search出来的地址
  private handleChange = (value: any, option: any) => {
    let { address_data } = this.state
    let current = address_data.find((item: any) => {
      return item.value === option.key
    })
    this.setState({ 
      address: value,
      currentAddress: current,
    }, () => {
      console.log(this.state.currentAddress)
    });
  }
  private formatAstivitieData = ({
    detail,
    icon_name,
    icon_color,
    name,
    offer,
    val
  }: any) => {
    return {
      detail,
      title: icon_name,
      icon_color,
      name,
      offer: offer?true:false,
      offer_data: offer,
      val
    }
  }
  private setSubmitLoad = (submitLoad: boolean = true) =>{
    this.setState({
      submitLoad
    })
  }
  private postAdd = async (params: any) => {
    try {
      let { data } = await reqAddShop(params)
      if (data.erron === 0) {
        message.success('添加成功')
        setTimeout(() => {
          this.props.history.push('/shoplist')
        }, 1000)
      }
    console.log(data)
    } catch (error) {}
    this.setSubmitLoad(false)
  }
  private postEdit = async (params: any) => {
    try {
      let { data } = await reqEditShop(params)
      console.log(data)
      if (data.erron === 0) {
        message.success('修改成功')
        setTimeout(() => {
          this.props.history.push('/shoplist')
        }, 1000)
      }
    } catch (error) { }
    this.setSubmitLoad(false)
  }
  // 提交
  private handleSubmit = (e: any) => {
    let { type } = this.props.state
    e.preventDefault();
    this.setSubmitLoad()
    this.props.form.validateFields( (err, values) => {
      if (!err) {
        values.avatar_image = this.avatar.getImg()
        values.business_license_image = this.businessLicense.getImg()
        values.catering_service_license_image = this.cateringServiceLicense.getImg()
        let {
          name,
          phone,
          introduction,
          slogan,
          category,
          trait,
          startTime,
          endTime,
          avatar_image,
          business_license_image,
          catering_service_license_image,
          promotion,
          promotion_info
        } = values
        let params: any = {
          address: this.state.currentAddress,
          city: this.state.city,
          name,
          phone,
          introduction,
          slogan,
          category,
          trait,
          startTime,
          endTime,
          avatar_image,
          business_license_image,
          catering_service_license_image,
          promotion,
          promotion_info
        }
        let day = values.shipping_fee_day ? values.shipping_fee_day : 0
        let nigth = values.shipping_fee_nigth ? values.shipping_fee_nigth : 0
        params.shipping_fee = [day, nigth]

        params.starting_price = values.starting_price ? values.starting_price : 0
        params.activitie_data = this.tableRef.getData().map(this.formatAstivitieData)
        let detailflag = false
        let offerflag = false
        params.activitie_data.forEach((item: any) => {
          if (!item.detail) {
            detailflag = true
            return
          }
        })
        params.activitie_data.forEach((item: any) => {
          if (!item.offer_data) {
            offerflag = true
            return
          }
        })
        if (detailflag) {
          message.warning('活动详情不能为空')
          this.setSubmitLoad(false)
          return
        }
        if (offerflag) {
          message.warning('活动数据不能为空')
          this.setSubmitLoad(false)
          return
        }
        console.log(params)
        if (type === 'add') {
          this.postAdd(params)
        } else {
          params._id = this.state._id
          this.postEdit(params)
        }
      } else {
        console.log(err)
        this.props.backTop()
        if (err.name) {
          message.warning(err.name.errors[0]['message'])
        } else if (err.address) {
          message.warning(err.address.errors[0]['message'])
        } else if (err.phone) {
          message.warning(err.phone.errors[0]['message'])
        } else if (err.category) {
          message.warning(err.category.errors[0]['message'])
        }
        this.setSubmitLoad(false)
      }
    });
  };
  // 获取显示分类
  private getCateShow = () => {
    let { cpid, cid} = this.state
    if (cpid === '0') {
      return [cid]
    } else {
      return [cpid, cid]
    }
  }
  // 联级改变
  private handleCascader = (value: any, selectedOptions: any) => {
    this.setState({
      cpid: value[0],
      cid: value[1] ? value[1] : ''
    }, () => {
      this.setState({
        category: this.getCateShow()
      })
    })
  }
  // 获取分类
  private getIdCategory = (cb?: any) => {
    let pagetype = this.props.state.type
    let { cpid } = this.state
    this.setState({
      cateload: true
    }, async () => {
      let params: any = {
        parent_id: 0
      }
      let { data } = await reqCategory(params)
      if (pagetype === 'edit' || pagetype === 'look') {
        // 存在第二个分类时
        if (cpid !== 0) {
          let params1: any = {
            parent_id: cpid
          }
          let res = await reqCategory(params1)
          // 给对应父分类添子分类
          this.setState({
            cateload: false,
            cates: data.data.map((item: any) => {
              return {
                value: item.id,
                children: item.id === cpid ? res.data.data.map((jtem: any) => {
                  return {
                    value: jtem.id,
                    label: jtem.name,
                    isLeaf: true
                  }
                }) : [],
                label: item.name,
                isLeaf: false
              }
            })
          }, () => {
            cb && cb()
          })
        }
      } else {
        this.setState({
          cateload: false,
          cates: data.data.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
              isLeaf: false
            }
          })
        })
      }
    })
  }
  // 加载分类
  public loadData = async (selectedOptions: any) => {
    // console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    let params: any = {
      parent_id: targetOption.value
    }
    let { data } = await reqCategory(params)
    targetOption.children = data.data.map((item: any) => {
      return {
        value: item.id,
        label: item.name
      }
    })
    targetOption.loading = false
    this.setState({
      cates: [...this.state.cates],
    })
  }
  // 获取城市
  public getLocation = async () => {
    let BMap: any = await $bmap()
    let citySearch = new BMap.LocalCity()
    citySearch.get((result: any) => {
      // console.log(result)
      this.setState({
        city: result.name.replace('市', '')
      })
    })
  }
  // 获取餐馆特点
  private getTraitList = async () => {
    let { data } = await reqTraitList({})
    if (data.erron === 0) {
      this.setState({
        trait_data: data.data.map((item: any) => {
          return {
            ...item,
            value: item.val,
            label: item.name
          }
        }),
        trait: data.data.map((item: any) => (item.val))
      })
    } else {
      message.warning(data.message)
    }
  }
  // 获取优惠活动
  private getPromotionList = async (cb?: any) => {
    let { data } = await reqPromotionList({})
    if (data.erron === 0) {
      this.setState({
        promotion_data: data.data.map((item: any) => {
          return {
            ...item,
            value: item.val,
            label: item.name
          }
        }).map((item: any) => {
          if (item.val === 'jian') {
            return {
              ...item,
              detail: '满30减5，满60减10',
              offer: '30,5:60,10'
            }
          } else {
            return {
              ...item,
              detail: item.detail?item.detail:'',
              offer: '1'
            }
          }
        }),
        promotion: [data.data[0].val],
        loading: false
      }, () => {
        cb&& cb()
      })
    } else {
      message.warning(data.message)
    }
  }
  // times
  private getTimes = () => {
    let data = []
    for (let i = 0; i < 24; i++) {
      let h = i < 10 ? '0' + i : i
      data.push(`${h}:00`)
      data.push(`${h}:15`)
      data.push(`${h}:30`)
      data.push(`${h}:45`)
    }
    return data
  }
  // distime
  private disabledTime = (item: any) => {
    let startTime = this.props.form.getFieldValue('startTime')
    let bj = moment(item, 'HH:mm') < moment(startTime, 'HH:mm')
    return bj
  } 
  private setShopInfo = () => {
    let shopinfo = Storage.get(EDIT_SHOP_INFO)
    if (!shopinfo) {
      this.props.history.push('/shoplist')
      message.warning('找不到餐馆信息')
      return;
    }
    this.setState({
      _id: shopinfo._id,
      city: shopinfo.city,
      name: shopinfo.name, //餐馆名字
      address: shopinfo.address.value, // 当前选择的地址
      currentAddress: shopinfo.address, // 当前选择的地址
      phone: shopinfo.phone, // 餐馆联系电话
      introduction: shopinfo.introduction, // 餐馆简介
      slogan: shopinfo.slogan,  // 餐馆标语
      category: shopinfo.category, // 餐馆分类
      cpid: shopinfo.category[0],
      cid: shopinfo.category[1],
      trait: shopinfo.trait,
      shipping_fee: shopinfo.shipping_fee,
      starting_price: shopinfo.starting_price,
      startTime: shopinfo.startTime,
      endTime: shopinfo.endTime,
      promotion: shopinfo.promotion,
      promotion_info: shopinfo.promotion_info,
      avatar_image: shopinfo.avatar_image,
      business_license_image: shopinfo.business_license_image,
      catering_service_license_image: shopinfo.catering_service_license_image,
      promotion_data: this.state.promotion_data.map((item: any) => {
        return {
          ...item,
          value: item.val,
          label: item.name
        }
      }).map((item: any) => {
        let current = shopinfo.activitie_data.find((jtem: any) => {
          return item.val === jtem.val
        })
        if (current) {
          return {
            ...item,
            detail: current.detail,
            offer: current.offer_data
          }
        } else {
          return {
            ...item,
            detail: '',
            offer: '1'
          }
        }
      }),
      loading: true
    }, () => {
      this.handleSearch(shopinfo.address.text)
      this.getIdCategory()
      this.setState({
        loading: false
      })
    })
  }
  componentDidMount () {
    let { state: { type } } = this.props
    this.getIdCategory()
    this.getLocation()
    this.getTraitList()
    this.getPromotionList(() => {
      if (type === 'edit' || type === 'look') {
        this.setShopInfo()
      }
    })
  }
  public shopListRef: any;
  render() {
    let { form: { getFieldDecorator }, mobile, state: {type} } = this.props
    let { 
      name,
      fetching,
      city,
      address,
      address_data,
      phone,
      introduction,
      slogan,
      category,
      cates,
      trait,
      trait_data,
      shipping_fee,
      starting_price,
      startTime,
      endTime,
      promotion_data,
      promotion,
      promotion_info,
      avatar_image,
      business_license_image,
      catering_service_license_image,
      loading,
      submitLoad
     } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 }}
    const formItemLayout1 = { labelCol: { span: 4 }, wrapperCol: { span: 8 }}
    const tailFormItemLayout = { wrapperCol: mobile ? { span: 22 } : { span: 18, offset: 4 } }
    const options = address_data.map((d: any) => <Option key={d.value}>{d.text}</Option>);
    const times = this.getTimes()
    const width = mobile?'calc(50% - 12px)':170
    const selectWidth = mobile ? '100%' : 170
    let msg = (
      <>
        <div>满减优惠：满30减5，满100减10输入这样的格式：30,5:100,10</div>
      </>
    )
    return (
      <div className="shoplist">
        <Card loading={loading} title={type === 'add' ? '增加餐馆' : type === 'edit'?'修改餐馆':'查看餐馆'}>
          <Row>
            <Col span={mobile?24:18}>
              <Form onSubmit={this.handleSubmit} className="add-form">
                <Item className="form-itme" label='餐馆名称' {...formItemLayout}>
                  {
                    getFieldDecorator('name', {
                      initialValue: name,
                      rules: [
                        { required: true, message: '餐馆名称必须输入' }
                      ]
                    })(
                      <Input disabled={type === 'look' ? true : false} placeholder='请输入餐馆名称' />
                    )
                  }
                </Item>
                <Item className="form-itme" label='餐馆地址' {...formItemLayout}>
                  {
                    getFieldDecorator('address', {
                      initialValue: address,
                      rules: [
                        { required: true, message: '餐馆地址必须输入' }
                      ]
                    })(
                      <Select
                        disabled={type === 'look' ? true : false}
                        showSearch
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                      >
                        {options}
                      </Select>
                    )
                  }
                  <div>当前餐馆城市：{city}</div>
                </Item>
                <Item className="form-itme" label='联系电话' {...formItemLayout}>
                  {
                    getFieldDecorator('phone', {
                      initialValue: phone,
                      rules: [
                        { required: true, message: '联系电话必须输入' },
                        { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '联系电话格式出错!' },
                      ]
                    })(
                      <Input disabled={type === 'look'?true:false} type='phone' placeholder='请输入联系电话' />
                    )
                  }
                </Item>
                <Item className="form-itme" label='餐馆简介' {...formItemLayout}>
                  {
                    getFieldDecorator('introduction', {
                      initialValue: introduction
                    })(
                      <Input disabled={type === 'look' ? true : false}/>
                    )
                  }
                </Item>
                <Item className="form-itme" label='餐馆标语' {...formItemLayout}>
                  {
                    getFieldDecorator('slogan', {
                      initialValue: slogan
                    })(
                      <Input disabled={type === 'look' ? true : false}/>
                    )
                  }
                </Item>
                <Item className="form-itme" label='餐馆欢迎语' {...formItemLayout}>
                  {
                    getFieldDecorator('promotion_info', {
                      initialValue: promotion_info
                    })(
                      <Input disabled={type === 'look' ? true : false}/>
                    )
                  }
                </Item>
                <Item className="form-itme" label="所属分类" {...formItemLayout1}>
                  {getFieldDecorator('category', {
                    initialValue: category,
                    rules: [
                      { required: true, message: '请选择商品分类!' },
                    ],
                  })(
                    <Cascader
                      disabled={type === 'look' ? true : false}
                      style={{ width: selectWidth}}
                      options={cates}
                      onChange={this.handleCascader}
                      loadData={this.loadData}
                      changeOnSelect
                      placeholder="选择分类" />
                  )}
                </Item>
                <Item className="form-itme" label='餐馆特点' {...formItemLayout}>
                  {
                    getFieldDecorator('trait', {
                      initialValue: trait
                    })(
                      <Checkbox.Group disabled={type === 'look' ? true : false} options={trait_data}></Checkbox.Group>
                    )
                  }
                </Item>
                <Item className="form-itme" label='配送费' {...formItemLayout}>
                  <Item className="form-itme" style={{ display: 'inline-block', width }}>
                    {
                      getFieldDecorator('shipping_fee_day', {
                        initialValue: shipping_fee[0],
                      })(
                        <InputNumber disabled={type === 'look' ? true : false} style={{width: '100%'}}/>
                      )
                    }
                  </Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                  <Item className="form-itme" style={{ display: 'inline-block', width }}>
                    {
                      getFieldDecorator('shipping_fee_nigth', {
                        initialValue: shipping_fee[1],
                      })(
                        <InputNumber disabled={type === 'look' ? true : false} style={{ width: '100%' }}/>
                      )
                    }
                  </Item>
                </Item>
                <Item className="form-itme" label='起送价' {...formItemLayout}>
                  {
                    getFieldDecorator('starting_price', {
                      initialValue: starting_price,
                    })(
                      <InputNumber disabled={type === 'look' ? true : false} style={{ width: selectWidth }}/>
                    )
                  }
                </Item>
                <Item className="form-itme" label='营业时间' {...formItemLayout}>
                  <Item className="form-itme" style={{ display: 'inline-block', width }}>
                    {
                      getFieldDecorator('startTime', {
                        initialValue: startTime
                      })(
                        <Select disabled={type === 'look' ? true : false} style={{width: '100%'}}>
                          {
                            times.map((item: any) => (<Option key={item}>{item}</Option>))
                          }
                        </Select>
                      )
                    }
                  </Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                  <Item className="form-itme" style={{ display: 'inline-block', width }}>
                    {
                      getFieldDecorator('endTime', {
                        initialValue: endTime
                      })(
                        <Select disabled={type === 'look' ? true : false} style={{ width: '100%' }}>
                          {
                            times.map((item: any) => (
                              <Option disabled={this.disabledTime(item) ? true : false} key={item}>{item}</Option>
                            ))
                          }
                        </Select>
                      )
                    }
                  </Item>
                </Item>
                <Item className="form-itme" label="餐馆头像" {...formItemLayout}>
                  <PictureWall disabled={type === 'look' ? true : false} imageName={avatar_image} onRef={(ref: any) => {this.avatar = ref}}></PictureWall>
                </Item>
                <Item className="form-itme" label="营业执照" {...formItemLayout}>
                  <PictureWall disabled={type === 'look' ? true : false} imageName={business_license_image} onRef={(ref: any) => {this.businessLicense = ref}}></PictureWall>
                </Item>
                <Item className="form-itme" label="餐饮服务许可证" {...formItemLayout}>
                  <PictureWall disabled={type === 'look' ? true : false} imageName={catering_service_license_image} onRef={(ref: any) => {this.cateringServiceLicense = ref}}></PictureWall>
                </Item>
                <Item className="form-itme" label='优惠活动' {...formItemLayout}>
                  {
                    getFieldDecorator('promotion', {
                      initialValue: promotion
                    })(
                      <Checkbox.Group disabled={type === 'look' ? true : false} options={promotion_data}></Checkbox.Group>
                    )
                  }
                  <Alert message={msg} type="success" />
                  <div style={{width: '100%', overflowX: 'auto'}}>
                    <ATable disabled={type === 'look' ? true : false} onRef={(ref: any) => { this.tableRef = ref }} value={this.props.form.getFieldValue('promotion')} data={promotion_data} />
                  </div>
                </Item>
                <Form.Item className="form-itme" {...tailFormItemLayout}>
                  {
                    type === 'look'?
                    <></>
                    :
                    <Button style={{marginRight: 10}} disabled={submitLoad} type="primary" htmlType="submit">
                      {
                        type === 'add' ? '提交' : '修改'
                      }
                    </Button>
                  }
                  <Button style={{marginRight: 10}} type="default" onClick={() => {
                    this.props.history.push('/shoplist')
                  }}>
                    返回
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

// 面包屑
const breadcrumb: IBreadcrumb[] = [
  {
    key: 0,
    link: true,
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
    link: false,
    text: '餐馆管理',
    path: ''
  },
]

export default connect(({global}: any)=>({
  mobile: global.mobile,
}))((BaseComponent(Form.create<IProps>()(AddEditShop), breadcrumb)))
