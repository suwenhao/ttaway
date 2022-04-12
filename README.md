# ttaway

# 项目已不再维护了，太监了，git上有很多比较好的项目，移步他们更好
## 项目启动和环境安装请看 “安装运行环境，和项目启动说明.docx” 

#### 介绍

仿 elm 外卖商城系统，Vue+Vant+Typescript 实现手机端外卖商城，React+Antd+Typescripts 实现后台管理，Node+Koa2+mongoose+Typescript 实现后台功能。使用腾讯地图 api 实现定位和地址搜索

#### 软件架构

1. client 为 h5 客户端
2. admin-client 为后台管理
3. server 为 service 服务器
4. docs 所需文件
   - ttaway mongodb 数据库文件

#### 项目运行详细说明

1. 请查看 `安装运行环境，和项目启动说明.docx` 这个文档

#### H5 端页面预览

<img src="./docs/images/1.png" width="220">
<img src="./docs/images/2.png" width="220">
<img src="./docs/images/3.png" width="220">
<img src="./docs/images/4.png" width="220">
<img src="./docs/images/5.png" width="220">
<img src="./docs/images/6.png" width="220">
<img src="./docs/images/7.png" width="220">
<img src="./docs/images/8.png" width="220">
<img src="./docs/images/9.png" width="220">
<img src="./docs/images/10.png" width="220">
<img src="./docs/images/11.png" width="220">
<img src="./docs/images/12.png" width="220">
<img src="./docs/images/13.png" width="220">
<img src="./docs/images/14.png" width="220">
<img src="./docs/images/15.png" width="220">
<img src="./docs/images/16.png" width="220">
<img src="./docs/images/17.png" width="220">
<img src="./docs/images/18.png" width="220">
<img src="./docs/images/19.png" width="220">
<img src="./docs/images/20.png" width="220">
<img src="./docs/images/21.png" width="220">
<img src="./docs/images/22.png" width="220">
<img src="./docs/images/23.png" width="220">
<img src="./docs/images/24.png" width="220">
<img src="./docs/images/25.png" width="220">
<img src="./docs/images/26.png" width="220">
<img src="./docs/images/27.png" width="220">
<img src="./docs/images/28.png" width="220">
<img src="./docs/images/29.png" width="220">
<img src="./docs/images/30.png" width="220">
<img src="./docs/images/31.png" width="220">
<img src="./docs/images/32.png" width="220">
<img src="./docs/images/33.png" width="220">

#### 后台管理页面预览

<img src="./docs/images/34.png" width="880">
<img src="./docs/images/35.png" width="880">
<img src="./docs/images/36.png" width="880">
<img src="./docs/images/37.png" width="880">
<img src="./docs/images/38.png" width="880">
<img src="./docs/images/39.png" width="880">
<img src="./docs/images/40.png" width="880">
<img src="./docs/images/41.png" width="880">
<img src="./docs/images/42.png" width="880">
<img src="./docs/images/43.png" width="880">
<img src="./docs/images/44.png" width="880">
<img src="./docs/images/45.png" width="880">
<img src="./docs/images/46.png" width="880">
<img src="./docs/images/47.png" width="880">
<img src="./docs/images/48.png" width="880">
<img src="./docs/images/49.png" width="880">

#### 技术栈说明

1. h5 端使用的以下技术 vue + vuex + vue-router + typescript + less + vant，使用的是 vant-ui 框架

   - 完成了首页数据显示，首页数据筛选
   - 首页店铺的距离检查，利用腾讯地图 api 实现
   - 完成了城市选择
   - 完成了地址搜索，使用的是腾讯地图提供的 api
   - 完成登录验证，server 使用到 koa-session
   - 完成了我的地址的新增和修改
   - 完成了个人信息的头像上传，个人信息展示
   - 完成了食品详情，食品加入购物车，订单下单，清空购物车
   - 完成了订单列表展示
   - 后续增加商品搜索
   - 后续增加商品分类列表搜索页
   - 后续增加 websocket 的订单显时支付，过时取消订单
   - 后续增加店铺收藏，食品收藏
   - 后续增加红包功能
   - 后续增加食品详情页，用户评论功能

2. admin-client 使用 react + react-router4.0 + react-redux + redux-saga + antd + typescript + less

   - 完成所有食品分类管理
   - 完成餐馆列表，餐馆的食品分类，餐馆信息
   - 完成新增餐馆，修改餐馆，删除餐馆
   - 完成食品列表
   - 完成新增食品，修改食品，删除食品
   - 完成管理员列表和新增修改管理员
   - 完成管理员角色管理
   - 后续新增查询订单，订单状态修改，删除订单
   - ...

3. server 使用 koa2 + typescript + mongoose
   - 提供以上两个前端的接口，数据模型，和逻辑操作功能

#### 安装教程

1. 请查看 `安装运行环境，和项目启动说明.docx` 这个文档
