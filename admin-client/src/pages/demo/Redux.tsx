import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as types from '../../reduxs/actions/demoAction'
import { Button, Table, Divider } from 'antd'
import { ActionModel } from '../../types';

interface IADD{
  num: number;
}
export interface IProps {
  data: any,
  num: number,
  add?: ActionModel<IADD>,
  minus?: ActionModel,
  getList?: any,
  [propName: string]: any
}

let mapStateToProps = (state: any): IProps => {
  return {
    num: state.demo.num,
    data: state.demo.data
  }
}

let mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(types, dispatch)
}

class Tables extends Component<IProps>{
  private $columns: any = [
    {
      title: '标题',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '作者',
      dataIndex: 'autor',
      key: 'autor',
    },
    {
      title: '内容',
      dataIndex: 'college',
      key: 'college',
    },
    {
      title: '分类',
      dataIndex: 'category_Id',
      key: 'category_Id',
    }
  ]
  private get columns () {
    return this.$columns
  }
  public render(): any {
    let { data, num, add, minus, getList } = this.props
    return (
      <div className="App">
        <h4>{num}</h4>
        <Button.Group>
          <Button onClick={
            () => {
              minus!()
            }
          }>-</Button>
          <Button onClick={
            () => {
              add!()
            }
          }>+</Button>
          <Button onClick={
            () => {
              add!({num: 2})
            }
          }>+2</Button>
          <Button onClick={
            () => {
              getList({count: 1})
            }
          }>getList</Button>
        </Button.Group>
        <Divider />
        <Table bordered dataSource={data} columns={this.columns} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
// export default Tables;