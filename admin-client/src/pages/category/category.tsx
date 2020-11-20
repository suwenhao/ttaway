import React, { Component } from 'react'
// antd
import { Button, message, Card } from 'antd'
import { ColumnProps } from 'antd/lib/table'
// redux
import { connect } from 'react-redux'
import { IState as IGlobalState } from '../../reduxs/reducers/globalReducer'
// config/api
import { 
  reqCategory,
  reqAddCategory,
  reqUpdateCategory,
  IReqAddCategory,
  IReqEditCategory
} from '../../api'
// component
import CollectionCreateForm from './modal'
// base
import BaseComponent, {IBreadcrumb} from '../../base/base'
import BaseTable from '../../base/table'
// css
import './category.less'

// 处理分类列表数据,二级
const mapCate = (data: any) => {
  let rowkeys: any = []
  let rootMenus: any = [];
  data.forEach((resource: any) => {
    if (resource.parent_id === 0) {
      resource.key = 1;
      rowkeys.push(resource.id)
      rootMenus.push(resource);
    }
  })
  data.forEach((resource: any) => {
    rootMenus.forEach((item: any) => {
      if (resource.parent_id === item.id) {
        if (item.children){
          resource.key = 2;
          item.children.push(resource)
        }else{
          rowkeys.push(item.id)
          item.children = []
          resource.key = 2;
          item.children.push(resource)
        }
      }
    })
  })
  // console.log(rootMenus)
  return {
    rowkeys,
    rootMenus
  }
}
interface IProps extends IGlobalState {}
class Category extends Component<IProps> {
  private columns: ColumnProps<any>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 80,
    },
    {
      title: '图片',
      dataIndex: 'image_url',
      align: 'center',
      width: 100,
      render: (text, item) => {
        return (
          <>
            <img width="25" height="25" src={text} onError={this.imgError} alt=""/>
          </>
        )
      }
    },
    {
      title: '数量',
      dataIndex: 'count',
      align: 'center',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (text: any, item: any) => {
        // console.log(text)
        return (
          <div className="buttons">
            {
              text.parent_id === -1?null
              :
              <Button size="small" type="link" onClick={() => {
                this.showCategory(item.id, 'edit', item.name)
              }}>编辑</Button>
            }
            {
              text.key === 2?
              <></>
              : 
              <Button size="small" type="link" onClick={() => {
                this.showCategory(item.id, 'add', '')
              }}>添加</Button>
            }
            
          </div>
        )
      },
    }
  ]
  public state = {
    visible: false,
    cates: [],
    rowkeys: [],
    parent_id: -1,
    category_name: '',
    type: 'add',
    loading: false,
    columns: this.columns
  }
  private imgError = (e: any) => {
    // console.log(e)
    e.currentTarget.src = require('../../assets/images/error.jpg')
  }
  // 节点展开
  public openExpand =(expanded: any, record: any) => {
    if (expanded) {
      let newRowKeys: string[] = this.state.rowkeys.concat()
      newRowKeys.push(record._id)
      this.setState({
        rowkeys: newRowKeys
      })
    }else{
      let newRowKeys = this.state.rowkeys.filter((item: any) => {
        return item !== record._id
      })
      this.setState({
        rowkeys: newRowKeys
      })
    }
  }
  // 获取分类列表
  public getCategoryList = async () => {
    this.setState({
      loading: true
    })
    try {
      let { data } = await reqCategory({})
      let tree = mapCate(data.data)
      tree.rowkeys.unshift(-1)
      // console.log(tree.rowkeys)
      this.setState({
        cates: [
          {
            parent_id: -1,
            _id: -1,
            name: '顶级菜单',
            children: tree.rootMenus
          }
        ],
        rowkeys: tree.rowkeys,
        loading: false
      })
    } catch (error) {}
  }
  // 添加或编辑分类
  public showCategory = (id: string, type: string, name: string) => {
    this.setState({
      visible: true,
      type: type,
      parent_id: id,
      category_name: name
    })
  }
  // 关闭增加分类弹窗
  public handleClose = () => {
    this.setState({
      visible: false
    })
  }
  // 点击增加分类
  public handleCreate = () => {
    let self = this
    const { form } = this.formRef.props;
    // 表单验证
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      (async()=>{
        if (this.state.type === 'add'){
          // 请求数据
          let params: IReqAddCategory = {
            parent_id: self.state.parent_id === -1 ? 0 : self.state.parent_id,
            category_name: values.category_name
          }
          // 请求api获取返回数据
          let { data } = await reqAddCategory(params)
          // 处理返回数据并提示
          self.addEditTip(data, form, '添加分类成功')
        } else {
          // 请求数据
          let params: IReqEditCategory = {
            category_id: self.state.parent_id === -1 ? 0 : self.state.parent_id,
            category_name: values.category_name
          }
          // 请求api获取返回数据
          let { data } = await reqUpdateCategory(params)
          // 处理返回数据并提示
          self.addEditTip(data, form, '修改分类成功')
        }
      })()
    })
  }
  // 添加/修改提示
  private addEditTip = (data: any, form: any, msg: string) => {
    message.success(msg)
    form.resetFields();
    // 重新获取分类
    this.getCategoryList()
    this.setState({ visible: false });
  }
  // 拿到form
  formRef: any
  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  }
  // 初始化
  componentDidMount () {
    this.getCategoryList()
  }
  public render() {
    let {mobile, collapsed} = this.props
    return (
      <Card title="分类列表" className="category">
        <div className="card-table">
          {
            mobile && !collapsed?
            <></>
            :
            <BaseTable
              openExpand={this.openExpand}
              width={false}
              size="middle"
              rowkeys={this.state.rowkeys}
              columns={this.state.columns}
              loading={this.state.loading}
              data={this.state.cates}></BaseTable>
          }
        </div>
        <CollectionCreateForm
          type={this.state.type}
          visible={this.state.visible}
          category_name={this.state.category_name}
          wrappedComponentRef={this.saveFormRef}
          onCreate={this.handleCreate}
          onCancel={this.handleClose}
        ></CollectionCreateForm>
      </Card>
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
    text: '品类管理',
    path: ''
  }
]
const mapStateToProps = (state: any) => {
  return {
    collapsed: state.global.collapsed,
    mobile: state.global.mobile
  }
}
export default connect(mapStateToProps)(BaseComponent(Category, breadcrumb))
