import React, { Component } from 'react'
// antd
import { 
  Card,
  Table,
  Form,
  Button,
  Popconfirm,
  Modal,
  Row,
  Col,
  Tooltip,
  Input,
  message
} from 'antd'
// router
import { RouteComponentProps } from 'react-router-dom'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
import { IMAGE_URL } from '../../config'
// api
import {
  reqFoodList
} from '../../api'
// util
import {
  PAGE_COUNT,
  PAGE_SIZE,
  PAGE_OPTIONS
} from '../../utils/constants'
// css
import './foodlist.less'

type IProps = RouteComponentProps & {
  laoding?: boolean;
}

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

class FoodList extends Component<IProps> {
  public state = {
    loading: false,
    columns: [
      { title: '食品名称', align: 'center', dataIndex: 'name', key: 'name' },
      {
        title: '食品封面',
        align: 'center',
        dataIndex: 'image_path',
        key: 'image_path',
        width: 100,
        render: (image_path: string) => {
          return (
            <>
              {
                image_path?
                <img onClick={() => {
                  this.setState({
                    visible: true,
                    currentAvatar: IMAGE_URL + image_path
                  })
                  }} width="25" src={IMAGE_URL + image_path} alt="" style={{ cursor: 'pointer'}} />
                :'暂无图片'
              }
            </>
          )
        }
      },
      { 
        title: '食品描述',
        align: 'center',
        dataIndex: 'description',
        key: 'description',
        render: (description: string) => (
          description?description:'--'
        )
      },
      { title: '评分', align: 'center', dataIndex: 'rating', key: 'rating' },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'x',
        key: 'x',
        render: (x: any, item:any) => {
          return (
            <div className="btns">
              <Tooltip placement="topRight" title="编辑">
                <Button icon="edit" size="small" type="primary" onClick={() => {
                  this.props.history.push(`/editfood/${item._id}/${item.shop_id}`)
                }}></Button>
              </Tooltip>
              <Tooltip placement="topRight" title="查看">
                <Button icon="eye" size="small" type="primary" onClick={() => {
                  this.props.history.push('/lookfood/' + item._id)
                }}></Button>
              </Tooltip>
              <Popconfirm
                placement="topRight"
                title="确定要删除该食品吗?"
                onConfirm={() => {
                  this.deleteFood(item._id)
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" type="danger">删除</Button>
              </Popconfirm>
            </div>
          )
        }
      },
    ],
    data: [],
    offset: PAGE_COUNT,
    limit: PAGE_SIZE,
    total: 0,
    visible: false,
    currentAvatar: ''
  }
  private getFoodList = async () => {
    let { offset, limit } = this.state
    this.setState({
      loading: true
    })
    try {
      let {data} = await reqFoodList({
        offset,
        limit
      })
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
  private deleteFood = async (_id: string) =>{
    console.log(_id)
  }
  public componentDidMount () {
    this.getFoodList()
  }
  public render() {
    let {
      loading,
      columns,
      data,
      offset,
      limit,
      total,
      visible,
      currentAvatar
    } = this.state
    const title = (
      <div className="card-title">
        <Button type='primary' onClick={() => {
          this.props.history.push('/shoplist')
        }}>增加食品</Button>
        <Input className="input" placeholder="输入食品名字"/>
        <Input className="input" placeholder="输入餐馆名字" />
      </div>
    )
    const expandedRowRender = (record: any) => {
      return (
        <>
          <Row>
            <ColItem label="食品名称" value={record.name}/>
            <ColItem label="食品餐馆" value={record.shopInfo.name} />
            <ColItem label="食品活动" value={record.activity?record.activity:'--'} />
            <ColItem label="食品评分" value={record.rating} />
            <ColItem label="食品销量" value={record.month_sales} />
            <ColItem label="食品分类" value={record.cateInfo.name} />
            <ColItem label="食品价格" value={'￥' + record.price} />
            <ColItem label="食品ID" value={record._id} />
            <ColItem label="餐馆_ID" value={record.shop_id} />
            <ColItem lay={false} label="食品描述" value={record.description ? record.description : '--'} />
            <ColItem lay={false} label="餐馆地址" value={record.shopInfo.address.text} />
          </Row>
        </>
      )
    }
    return (
      <div className="food-list">
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
                  this.getFoodList()
                })
              },
              onShowSizeChange: (current, size) =>{
                console.log(size)
                this.setState({
                  offset: PAGE_COUNT,
                  limit: size
                }, () => {
                  this.getFoodList()
                })
              }
            }}
            expandedRowRender={expandedRowRender}
            dataSource={data}
          />
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
        </Card>
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
    link: false,
    text: '食品列表',
    path: ''
  },
]

export default (BaseComponent(FoodList, breadcrumb))
