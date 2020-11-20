# ttaway

#### 介绍

仿 elm 外卖商城系统，Vue+Vant+Typescript 实现手机端外卖商城，React+Antd+Typescripts 实现后台管理，Node+Koa2+mongoose+Typescript 实现后台功能。使用腾讯地图 api 实现定位和地址搜索

#### 软件架构

1. client 为 h5 客户端
2. admin-client 为后台管理
3. server 为 service 服务器
4. docs 所需文件
   - ttaway mongodb 数据库文件

#### 项目运行详细说明

1. 先安装了 mongodb 数据库，然后进入这个项目目录 docs 文件夹
2. 在 docs 文件夹打开 cmd 命令行，运行 `mongorestore -h 127.0.0.1 -d ttaway ./ttaway` 这条命令
3. 这样数据库文件就齐全了，要保持 MongoDB 数据库处于启动中，mongodb4.xx 版本的话在 window 上是开机就启动的，所以比较方便，mongodb3.xx 版本要手动启动。
4. 然后 client 文件夹、admin-client 文件夹和 server 文件夹，都运行 npm install 命令，运行环境装备完毕。
5. 启动后台，在 server 文件夹运行 npm run start
6. client 文件夹为 H5 端，运行命令为 npm run serve
7. admin-client 文件夹为管理后台，运行命令为 npm run watch-server，如果要运行 npm run start 的话，这个是编译 ts 版本成 js 版本放到 dist 目录，不过 public 目录静态文件不会带过去，所以要复制过去
8. H5 端图片不显示问题，可以修改 client 文件夹下的`.env.dev`文件里面的 VUE_APP_UPLOAD_URL
   - 值为：http://localhost:3001/upload/
   - 或者：http://本地 ip4 地址:3001/upload/ 注意:是你电脑的 ip4 地址，这样在手机上测试也能看到图片

#### H5 端页面预览
<div style="display: flex;"> 
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/1.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/2.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/3.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/4.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/5.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/6.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/7.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/8.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/9.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/10.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/11.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/12.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/13.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/14.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/15.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/16.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/17.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/18.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/19.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/20.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/21.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/22.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/23.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/24.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/25.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/26.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/27.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/28.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/29.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/30.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/31.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/32.png" width="220">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/33.png" width="220">
</div>
#### 后台管理页面预览
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/34.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/35.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/36.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/37.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/38.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/39.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/40.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/41.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/42.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/43.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/44.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/45.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/46.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/47.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/48.png" width="880">
<img src="https://gitee.com/suwenhao/ttaway/raw/master/docs/images/49.png" width="880">
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

1.  安装数据库
    - 先进入 docs 文件夹
    - 然后在当前目录打开 cmd
    - mongorestore -h 127.0.0.1 -d ttaway ./ttaway
2.  client 安装
    - cnpm install
3.  admin-client 安装
    - yarn install
4.  server 安装
    npm install 或 yarn install 或 cnpm install

#### 使用说明

1.  如果数据库有设有用户密码就在 server 文件夹的 src 文件夹的 db 文件夹中的 mg.ts 中修改
    - 在 server 文件夹的 src 文件夹的 conf 文件夹中的 db.ts 做用户名和密码配置
2.  后台管理登录
    - 账号：admin 密码：admin
3.  H5 端验证码，看控制台或者查看点击发送验证码的接口看其返回的数据就是验证码了
