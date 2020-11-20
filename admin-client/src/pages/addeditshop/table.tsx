import React, { Component } from 'react'
import { Input } from 'antd'
import './addeditshop.less'
interface IProps {
  onRef?: (ref: any) => void;
  data: any;
  value: any;
  disabled?: boolean;
}
class Table extends Component<IProps> {
  public tableRef: any;
  static defaultProps = {
    onRef: (ref: any) => {},
    disabled: false,
  }
  public state = {
    actives: []
  }
  private getData = () => {
    return this.state.actives
  }
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps (nextProps: IProps) {
    // console.log('componentWillReceiveProps()', nextProps)
    const data = nextProps.data
    const value = nextProps.value
    let newData = data.filter((item: any) => {
      return value.indexOf(item.val) !== -1
    })
    this.setState({
      actives: newData
    })
  }
  private inputOnChange = (value: string, attr:string, index: number) => {
    let actives = [...this.state.actives]
    // @ts-ignore
    actives[index][attr] = value
    this.setState({
      actives
    })
  }
  componentDidMount () {
    this.props.onRef && this.props.onRef(this)
  }
  render () {
    let style = {width: 140}
    let {actives} = this.state
    let { disabled } = this.props
    return (
      <>
        <div style={{height:10}}></div>
        <table ref={(ref: any) => this.tableRef = ref} className="a-table">
          <thead>
            <tr>
              <th>活动标题</th>
              <th>活动名称</th>
              <th>活动详情</th>
              <th>活动数据</th>
            </tr>
          </thead>
          <tbody>
          {
            actives.map((item: any, index: number) => {
              return (
                <tr className="ttr" key={item._id}>
                  {
                    <>
                      <td>{item.icon_name}</td>
                      <td>{item.name}</td>
                      <td>
                        <Input disabled={disabled} onChange={(e: any) => {
                          this.inputOnChange(e.target.value, 'detail', index)
                        }} className="detial" value={item.detail} size="small" style={style}/>
                      </td>
                      <td>
                        <div>
                          <Input disabled={disabled} onChange={(e: any) => {
                            this.inputOnChange(e.target.value, 'offer', index)
                          }} className="offer" value={item.offer} size="small" style={style}/>
                        </div>
                      </td>
                    </>
                  }
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </>
    )
  }
}

export default Table