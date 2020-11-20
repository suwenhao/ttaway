import React, {Component} from 'react'
import { ColumnProps } from 'antd/lib/table'
import {Table} from 'antd'

interface IPrpos {
  loading?: boolean;
  columns: ColumnProps<any>[];
  data: any;
  size?: string;
  width: number | string | boolean;
  page: boolean;
  limit?: number;
  offset?: number;
  total?: number;
  rowkeys?: any;
  openExpand?: any;
  rowSelection?: any;
  changePageNum?: (offset: number) => void;
}

class BaseTable extends Component<IPrpos> {
  static defaultProps = {
    width: 1000,
    loading: false,
    size: 'small',
    page: false,
    limit: 10,
    offset: 1,
    total: 0,
    rowkeys: [],
    openExpand: () => {},
    changePageNum: (offset: number) => {}
  }
  state={
    // columns: [],
    y: 500
  }
  componentDidMount () {
    let vh = document.documentElement.clientHeight
    const { page, columns} = this.props
    this.setState({
      columns,
      y: page ? vh - 50 - 300 : vh - 50 - 250
    })
    // console.log(vh - 50 - 130)
    window.addEventListener('resize', () => {
      let vh = document.documentElement.clientHeight
      this.setState({
        y: page ? vh - 50 - 300 : vh - 50 - 250
      })
    })
  }
  public render () {
    let self = this
    let changePageNum = this.props.changePageNum!
    return (
      <>
        <Table 
          scroll={{ x: 600, y: this.state.y }}
          bordered={true}
          defaultExpandAllRows={true}
          expandedRowKeys={this.props.rowkeys}
          onExpand={this.props.openExpand}
          loading={this.props.loading}
          rowKey="_id"
          // @ts-ignore
          size={this.props.size}
          columns={this.props.columns}
          pagination={
            this.props.page?
            {
              total: this.props.total,
              defaultPageSize: this.props.limit,
              showQuickJumper: true,
              current: this.props.offset,
              onChange: (offset) => {
                console.log(self.props)
                  changePageNum(offset)
              }
            }
            :false
          }
          dataSource={this.props.data}></Table>
      </>
    )
  }
}
export default BaseTable
