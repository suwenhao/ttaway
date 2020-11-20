import React, { Component } from 'react'
// antd
import {
  Card,
  Form,
  Button,
  Table,
  Popconfirm,
  Modal,
  Row,
  Col, 
  Tooltip,
  Input,
  message
} from 'antd'
// component
import FoodCate from '../../components/FoodCate'
// router
import { RouteComponentProps } from 'react-router-dom'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
import { IMAGE_URL } from '../../config'
import StorageModel, {EDIT_SHOP_INFO} from '../../utils/storage'
// api
import {
  reqShopList,
  reqDeleteShop,
  reqAddShopFoodCate,
  reqShopFoodCateList
} from '../../api'
// css
import './shoplist.less'
// util
import {
  PAGE_COUNT,
  PAGE_SIZE,
  PAGE_OPTIONS
} from '../../utils/constants'

const Storage = new StorageModel()
const { Search } = Input;

const ColItem = ({ label , value, lay = true}: any) => {
  let layout = { span: 11, offset: 1 }
  let layout1 = { span: 23, offset: 1 }
  let la = lay?layout:layout1
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } }
  const formItemLayout1 = { labelCol: { span: 2 }, wrapperCol: { span: 22 } }
  let fla = lay ? formItemLayout : formItemLayout1
  return (
    <>
      <Col {...la}>
        <Form.Item className="form-itme" label={label} {...fla}>{value}</Form.Item>
      </Col>
    </>
  )
}
type IProps = RouteComponentProps & {
  laoding?: boolean;
}
class ShopList extends Component<IProps> {
  public formRef: any;
  public state = {
    data: [],
    total: 0,
    visible: false,
    loading: true,
    columns: [
      { title: '餐馆名字', align: 'center', dataIndex: 'name', key: 'name' },
      {
        title: '餐馆封面',
        align: 'center',
        dataIndex: 'avatar_image',
        key: 'avatar_image',
        width: 100,
        render: (avatar_image: string) => {
          return (
            <>
              {
                avatar_image?
                <img onClick={() => {
                  this.setState({
                    visible: true,
                    currentAvatar: IMAGE_URL + avatar_image
                  })
                }} width="25" src={IMAGE_URL + avatar_image} alt="" style={{ cursor: 'pointer'}} />
                :'暂无图片'
              }
            </>
          )
        }
      },
      {
        title: '地址',
        align: 'center',
        dataIndex: 'address',
        key: 'address',
        render: (address: any) => {
          return (
          <>
            {address?address.text:'--'}
          </>
          )
        }
      },
      {
        title: '操作',
        align: 'center',
        key: 'x',
        width: 260,
        render: (x: any, item:any) => {
          return (
            <div className="btns">
              <Tooltip placement="topRight" title="编辑">
                <Button icon="edit" size="small" type="primary" onClick={() => {
                  Storage.set(EDIT_SHOP_INFO, item)
                  this.props.history.push('/editshop')
                }}></Button>
              </Tooltip>
              <Tooltip placement="topRight" title="查看">
                <Button icon="eye" size="small" type="primary" onClick={() => {
                  Storage.set(EDIT_SHOP_INFO, item)
                  this.props.history.push('/lookshop')
                }}></Button>
              </Tooltip>
              <Button size="small" type="primary" onClick={() => {
                this.props.history.push(`/addfood/${item._id}`)
              }}>添加食品</Button>
              <Button size="small" type="primary" onClick={() => {
                this.setState({
                  shop_id: item._id,
                  foodcateShow: true,
                }, () => {
                  this.getShopFoodCateList()
                })
              }}>种类</Button>
              <Button size="small" type="primary" onClick={() => {
                this.props.history.push(`/shopinfo/${item._id}`)
              }}>信息</Button>
              <Popconfirm
                placement="topRight"
                title="确定要删除该餐馆吗?"
                onConfirm={() => {
                  this.deleteShop(item._id)
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" type="danger">删除</Button>
              </Popconfirm>
             
            </div>
          )
        },
      },
    ],
    currentAvatar: '',
    foodcateShow: false,
    shop_id: null,
    select_data: [],
    offset: PAGE_COUNT,
    limit: PAGE_SIZE,
    search: '',
  }
  private getShopList = async () => {
    let { limit, offset, search } = this.state
    try {
      this.setState({
        laoding: true
      })
      let params: any = {
        limit,
        offset,
      }
      if (search) {
        params.search = search
      }
      let { data } = await reqShopList(params)
      console.log(data)
      if (data.erron === 0) {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          loading: false
        })
      }
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }
  private deleteShop = async (_id: string) => {
    try {
      let { data } = await reqDeleteShop({ _id })
      if (data.erron === 0) {
        message.success('删除成功')
        this.getShopList()
      }
    } catch (error) {}
  }
  private getShopFoodCateList = async () => {
    let { shop_id } = this.state
    try {
      let { data } = await reqShopFoodCateList({ shop_id })
      console.log(data)
      if (data.erron === 0) {
        this.setState({
          select_data: data.data
        })
      }
    } catch (error) { }
  }
  private addShopCateFood = async () => {
    let { shop_id } = this.state
    let { form } = this.formRef.props
    form.validateFields(async (err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let params: any = {
          shop_id,
          name: values.name
        }
        if (values.description) {
          params.description = values.description
        }
        try {
          let { data } = await reqAddShopFoodCate(params)
          console.log(data)
          if (data.erron === 0) {
            message.success('添加食品种类成功')
            this.setState({
              foodcateShow: false,
            }, () => {
              this.resetName()
            })
          }
        } catch (error) {}
      }
    })
  }
  private resetName = () => {
    let { form } = this.formRef.props
    form.resetFields()
  }
  public componentDidMount () {
    this.getShopList()
  }
  render() {
    const {
      columns,
      data,
      visible,
      currentAvatar,
      loading,
      foodcateShow,
      shop_id,
      select_data,
      offset,
      limit,
      search,
      total
    } = this.state
    const title = (
      <div className="card-title">
        <Search 
          value={search}
          onChange={(e) => {
            this.setState({
              search: e.target.value
            })
          }}
          allowClear
          enterButton
          className="input"
          placeholder="输入餐馆名搜索"
          onSearch={() => {
            this.getShopList()
          }}
        />
        <Button type='primary' onClick={() => {
          this.props.history.push('/addshop')
        }}>增加餐馆</Button>
      </div>
    )
    const expandedRowRender = (record: any) => {
      return (
        <>
          <Row>
            <ColItem label="餐馆名字" value={record.name}/>
            <ColItem label="餐馆简介" value={record.introduction} />
            <ColItem label="餐馆_ID" value={record._id} />
            <ColItem label="联系电话" value={record.phone} />
            <ColItem label="营业时间" value={`${record.startTime}/${record.endTime}`} />
            <ColItem label="评分" value={record.rating} />
            <ColItem label="销量" value={record.sale} />
            <ColItem label="分类" value={record.category_data.map((item: any)=>item.name).join('/')} />
            <ColItem lay={false} label="餐馆地址" value={record.address.text} />
            <ColItem lay={false} label="餐馆标语" value={record.slogan} />
          </Row>
        </>
      )
    }

    return (
      <div className="shoplist">
        <Card title={title}>
          <Table
            loading={loading}
            bordered
            scroll={{ x: 800 }}
            rowKey="_id"
            size="middle"
            // @ts-ignore
            columns={columns}
            pagination={{
              current: offset,
              pageSize: limit,
              total,
              size: 'default',
              pageSizeOptions: PAGE_OPTIONS,
              showSizeChanger: true,
              onChange: (page, limit) => {
                this.setState({
                  offset: page,
                  limit
                }, () => {
                  this.getShopList()
                })
              },
              onShowSizeChange: (current, limit) =>{
                this.setState({
                  offset: PAGE_COUNT,
                  limit
                }, () => {
                  this.getShopList()
                })
              }
            }}
            expandedRowRender={expandedRowRender}
            dataSource={data}
          />
          {/* <a href={'tel:' + phone}>{phone}</a> */}
          <Modal
            width={400}
            title="查看封面"
            visible={visible}
            footer={false}
            onCancel={()=>{
              this.setState({
                visible: false
              })
            }}
          >
            <img width="100%" src={currentAvatar} alt=""/>
          </Modal>
          <Modal
            width={500}
            title="增加分类"
            visible={foodcateShow}
            onOk={this.addShopCateFood}
            onCancel={() => {
              this.setState({
                foodcateShow: false,
                shop_id: null,
                select_data: []
              }, () => {
                this.resetName()
              })
            }}
          >
            <FoodCate data={select_data} onRef={(ref: any) => this.formRef = ref} shop_id={shop_id}/>
          </Modal>
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
    key: 0,
    link: false,
    text: '数据管理',
    path: ''
  },
  {
    key: 0,
    link: false,
    text: '餐馆列表',
    path: ''
  },
]

export default (BaseComponent(ShopList, breadcrumb))
