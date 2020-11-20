import React, {Component} from 'react'
// antd components
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Popconfirm
} from 'antd'
// components
import UserForm from './user-form'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalAction from '../../reduxs/actions/globalAction'
// plugin
import {formateDate} from "../../utils/dateUtils"
// api
import { reqAddUser, reqUpdateUser, reqDeleteUser, reqUserUpdateInfo } from "../../api";
// constants
import { PAGE_SIZE } from '../../utils/constants'
// types
import { ConnectProps } from '../../types/connect';
import { ColumnProps } from 'antd/lib/table';
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
// class function
import StorageModel, { MANAGE_INFO } from '../../utils/storage'
// css
import './user.less'

const Storage = new StorageModel()

const mapStateToProps = ({ global, user, role }: any) => {
  return {
    manage_info: global.manage_info,
    users: user.users,
    roles: role.roles,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ ...globalAction }, dispatch)
}
type IProps = ConnectProps & {
  manage_info: globalAction.IManageInfo;
  users: any[];
  roles: any[];
  changeManageInfo: (manage_info: globalAction.IManageInfo) => void;
  changeRoleList: (polyload?: any) => void;
  changeUserList: (polyload?: any) => void;
}
interface IState {
  columns?: ColumnProps<any>[];
  isShow?: boolean;
  loading?: boolean;
}

class User extends Component<IProps, IState> {
  static defaultProps = {
    users: [],
    roles: [],
  }
  public role_names: any;
  public user: any;
  public form: any;
  public state:  IState = {
    isShow: false, // 是否显示确认框
    columns: [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        render: (text: any) => (text?text:'--'),
      },

      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
        render: (text: any) => (text?text:'--'),
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        align: 'center',
        width: 100,
        render: (role_id: string,item: any) => {
          return (
            <>
            {role_id?item.role.length>0?item.role[0]['name']:'--':'--'}
            </>
          )
        }
      },
      {
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (text: any, item: any) => (
          <span>
            <Button size="small" type="link" onClick={() => this.showUpdate(item)}>修改</Button>
            <Popconfirm
                placement="topRight"
                title="确定要删除该角色管理员吗?"
                onConfirm={() => {
                  this.deleteUser(item._id)
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" type="link">删除</Button>
            </Popconfirm>
          </span>
        )
      },
    ],
    loading: false
  }
  // 显示添加界面
  private showAdd = () => {
    this.user = null // 去除前面保存的user
    this.setState({isShow: true}, () => {
      this.getRoles()
    })
  }

  // 显示修改界面
  showUpdate = (user: any) => {
    this.user = user // 保存user
    this.setState({
      isShow: true
    }, () => {
      this.getRoles()
    })
  }

  // 删除指定用户
  private deleteUser = async (_id: string) => {
    try {
      let { data } = await reqDeleteUser({ _id })
      // console.log(data)
      if (data.erron === 0) {
        message.success('删除成功')
        this.getUsers()
      }
    } catch (error) {}
  }

  // 添加/更新用户
  private addOrUpdateUser = async () => {
    let { manage_info } = this.props
    // 1. 收集输入数据
    this.form.validateFields(async (error: any, user: any) => {
      if (!error) {
        // 如果是更新, 需要给user指定_id属性
        if (this.user) {
          user._id = this.user._id
        }
        let result: any;
        // // 2. 提交添加的请求
        if (user._id) {
          result = await reqUpdateUser(user)
        } else {
          result = await reqAddUser(user)
        }
        this.form.resetFields()
        // 3. 更新列表显示
        if(result.data.erron === 0) {
          if (user._id === manage_info.manage_id) {
            this.updateUserInfo()
          }
          message.success(`${this.user ? '修改' : '添加'}成功`)
          this.setState({isShow: false},() => {
            this.getUsers()
          })
        }
      }
    })
  }
  public updateUserInfo = async () => {
    let { data } = await reqUserUpdateInfo({})
    if (data.erron === 0) {
      let manage_info = {
        manage_name: data.data.username,
        manage_id: data.data._id,
        email: data.data.email,
        role_id: data.data.role_id ? data.data.role_id : '',
        role: {
          menus: data.data.menus ? data.data.menus : []
        },
        phone: data.data.phone,
      }
      // 保存在localStorage
      Storage.set(MANAGE_INFO, manage_info)
      // 同步到redux
      this.props.changeManageInfo(manage_info)
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }
  }
  // 获取userlist
  public getUsers = async () => {
    this.props.changeUserList()
  }

  // 获取角色列表
  private getRoles = () => {
    this.props.changeRoleList()
  }
  public componentDidMount () {
    this.getUsers()
  }

  public render() {
    const { isShow, columns, loading } = this.state
    const { users, roles } = this.props
    const user = this.user || {}

    const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
    const newUsers = users.filter((item: any) => {
      return item.username !== 'admin'
    })
    return (
      <Card title={title}>
        <Table
          scroll={{x: 800}}
          loading={loading}
          bordered
          rowKey='_id'
          size="middle"
          dataSource={newUsers}
          columns={columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
        />

        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }}
        >
          <UserForm
            setForm={(form: any) => this.form = form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
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
    text: '用户管理',
    path: ''
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent(User, breadcrumb))