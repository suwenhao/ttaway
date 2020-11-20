import React, { Component } from 'react'
// antd
import { Row, Col, Typography  } from 'antd'
// base
import BaseComponent, { IBreadcrumb } from '../../base/base'
// css
import './home.less'

const {Title} = Typography 

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Row gutter={24} className="row">
          <Col  xs={24} sm={24} md={24} lg={24}>
            <Title className="title" level={4}>欢迎使用团团外卖后台管理系统</Title>
          </Col>
        </Row>
        <Row gutter={24} className="row">
          <Col xs={24} sm={24} md={12} lg={8}>

          </Col>
          <Col xs={24} sm={24} md={12} lg={8}></Col>
        </Row>
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
]

export default (BaseComponent(Home, breadcrumb))
