import React, { Component } from 'react'
// antd
import { Button, message, Card, Modal, Table, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/lib/table'
// redux
import { connect } from 'react-redux'
import { GET_ROLE_LIST } from '../../reduxs/constants/roleType'
// component
import AddForm from './add-form'
import AuthForm from './auth-form'
// plugins
import { formateDate } from '../../utils/dateUtils'
import StorageModel, { MANAGE_TOKEN } from '../../utils/storage'
// constants
import { PAGE_SIZE } from '../../utils/constants'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
// api 
import {
  reqAddRole,
  reqDeleteRole,
  reqUpdateRole,
  reqSetRolePermission
} from '../../api'
// css
import './role.less'
// types
import { ConnectProps } from '../../types/connect'
import { IManageInfo } from '../../reduxs/actions/globalAction'
import { IRoleItem } from '../../reduxs/reducers/roleReducer'
const Storage = new StorageModel()
const mapStateToProps = ({ global, role }: any) => {
  return {
    manage_info: global.manage_info,
    roles: role.roles,
  }
}

type IProps = ConnectProps & {
  roles?: IRoleItem[];
  manage_info: IManageInfo;
  logout: () => void;
}
interface IState {
  role: any;
  columns: ColumnProps<any>[];
  isShowAdd?: boolean;
  isShowAuth?: boolean;
  formType: string;
  addEdit?: any;
  role_name?: string;
  _id?: string;
}
class Role extends Component<IProps, IState> {
  static defaultProps = {
    logout: () => {}
  }
  public state: IState = {
    role: {}, // 选中的role
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
    formType: 'add',
    addEdit: {
      add: '添加角色',
      edit: '修改角色'
    },
    _id: '',
    role_name: '',
    columns: [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        align: 'center',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        align: 'center',
        width: 80,
        render: (text: any) => (text?text:'--')
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
              <Button size="small" type="link" onClick={() => {
                this.setState({
                  isShowAdd: true,
                  formType: 'edit',
                  role_name: item.name,
                  _id: item._id
                })
              }}>编辑</Button>
              <Popconfirm
                placement="topRight"
                title="确定要删除该角色吗?"
                onConfirm={(e: any) => {
                  e.stopPropagation()
                  this.deleteRole(item._id)
                }}
                onCancel={(e:any)=>{e.stopPropagation()}}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" type="link" onClick={(e:any)=>{e.stopPropagation()}}>删除</Button>
              </Popconfirm>
            </div>
          )
        },
      }
    ],
   
  }
  public auth: any;
  public form: any;
  constructor (props: IProps) {
    super(props)
    this.auth = React.createRef()
  }
  private imgError = (e: any) => {
    // console.log(e)
    e.currentTarget.src = require('../../assets/images/error.jpg')
  }
  // 添加/修改角色
  private addEditRole = () => {
    let { formType, _id } = this.state
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields(async (error: any, values: any) => {
      if (!error) {
        // 收集输入数据
        const {role_name} = values
        const params: any = {
          role_name
        }
        let res: any;
        let tip = '添加'
        if (formType === 'add') {
          // 请求添加
          res = await reqAddRole(params)
        } else {
          params._id = _id
          // 请求修改
          res = await reqUpdateRole(params)
          tip = '修改'
        }
        // 根据结果提示/更新列表显示
        if (res.data.erron === 0) {
          message.success(`${tip}成功`)
          this.getRoles()
        }
        this.form.resetFields()
        // 隐藏确认框
        this.setState({
          isShowAdd: false
        })
      }
    })
  }
  // 删除角色
  private deleteRole = async (_id: string) => {
    try {
      let { data } = await reqDeleteRole({ _id })
      if (data.erron === 0) {
        message.success('删除成功')
        this.getRoles()
      }
    } catch (error) {}
  }
  private onRow = (role: any) => {
    return {
      onClick: (event: any) => { // 点击行
        this.setState({
          role
        })
      },
    }
  }
  // 获取列表
  private getRoles = () => {
    let dispatch = this.props.dispatch!
    dispatch({
      type: GET_ROLE_LIST
    })
  }
  // 更新角色权限
  private updateRole = async () => {
    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })
    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    let params = {
      menus,
      auth_time: Date.now(),
      auth_name: this.props.manage_info.manage_name,
      _id: role._id,
    }
    // 请求更新
    const { data } = await reqSetRolePermission(params)
    if (data.erron === 0) {
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === this.props.manage_info.role_id) {
        message.success('当前用户角色权限成功，请重新登录')
        Storage.remove(MANAGE_TOKEN)
        setTimeout(() => {
          this.getRoles()
        }, 1500)
      } else {
        message.success('设置权限成功')
      }
      this.getRoles()
    }
  }
  // 初始化
  public componentDidMount() {
    this.getRoles()
  }
  public render() {
    let { roles } = this.props
    let {
      columns,
      role,
      isShowAdd,
      addEdit,
      formType,
      role_name,
      isShowAuth
     } = this.state
    return (
      <Card title="角色管理" className="role">
        <div className="btns">
          <Button type="primary" onClick={() => {
            this.setState({
              isShowAdd: true,
              formType: 'add',
              role_name: ''
            })
          }}>创建角色</Button>
          <Button disabled={!role._id} className="right-btn" type="primary" onClick={()=>{
            this.setState({isShowAuth: true})
          }}>设置角色权限</Button>
        </div>
        <div className="card-table">
          <Table
            scroll={{x: 700}}
            bordered
            // @ts-ignore
            size="middle"
            rowKey='_id'
            dataSource={roles}
            columns={columns}
            pagination={{defaultPageSize: PAGE_SIZE}}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [role._id],
              onSelect: (role: any) => { // 选择某个radio时回调
                this.setState({
                  role
                })
              }
            }}
            onRow={this.onRow}
          />
        </div>
        <Modal
          title={addEdit[formType]}
          width={400}
          visible={isShowAdd}
          onOk={this.addEditRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            })
            this.form.resetFields()
          }}
        >
          <AddForm
            role_name={role_name}
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          className="auth-modal"
          width={400}
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
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
    text: '系统管理',
    path: ''
  },
  {
    key: 2,
    link: false,
    text: '角色管理',
    path: ''
  },
]

export default connect(mapStateToProps)(BaseComponent(Role, breadcrumb))
