import React, {PureComponent} from 'react'
import {
  Form,
  Tree,
  Input
} from 'antd'
import menuList, {IMenu} from '../../config/menu'
// css
import './role.less'

const Item = Form.Item

const { TreeNode } = Tree;

type IProps = {
  role?: any;
}
interface IState {
  checkedKeys?: any[] 
}
export default class AuthForm extends PureComponent<IProps, IState> {
  public state: IState;
  public treeNodes: any;
  constructor (props: IProps) {
    super(props)

    // 根据传入角色的menus生成初始状态
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  public getMenus = () => this.state.checkedKeys

  private getTreeNodes = (menuList: IMenu[]) => {
    return menuList.reduce((pre: any, item: any) => {
      pre.push(
        <TreeNode title={item.title} key={item.path}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  // 选中某个node时的回调
  onCheck = (checkedKeys: any) => {
    // console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };


  componentWillMount () {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  // 根据新传入的role来更新checkedKeys状态
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps (nextProps: IProps) {
    // console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    console.log('AuthForm render()')
    const { role } = this.props
    const {checkedKeys} = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <div className="auth-form">
        <Item className="form-itme" label='角色名称' {...formItemLayout}>
          <Input size="default" readOnly disabled value={role.name}/>
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}