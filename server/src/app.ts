/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import * as Koa from 'koa'
import * as Session from 'koa-generic-session'
import * as BodyParser from 'koa-bodyparser'
import * as Compress from 'koa-compress'
import * as Json from 'koa-json'
import * as redisStore from 'koa-redis'
import * as SocketIo from 'socket.io'
import * as Koajwt from 'koa-jwt'
import * as Static from 'koa-static'
import * as path from 'path'
// @ts-ignore
import * as Cors  from 'koa2-cors'
// @ts-ignore
import * as Zlib from 'zlib'
import { REDIS_CONF } from './conf/db'
import { COOKIE_KEY, JWT_KEY } from './conf/constant'
// middleware
import { ErrorHandle } from './middleware/errorHandle'
// router
import FilterRoutes from './filters/routes'
import CityRouter from './routes/api/city'
import APIRouter from './routes/api/index'
import CenterRouter from './routes/api/center'
import OrderRouter from './routes/api/order'
import TraitRouter from './routes/api/trait'
import PromotionRouter from './routes/api/promotion'
import CategorieRouter from './routes/api/categorie'
import AdminRouter from './routes/sys'
import ManageRouter from './routes/sys/manage'
import RoleRouter from './routes/sys/role'
import ShopRouter from './routes/sys/shop'
import ShoppingRouter from './routes/api/shopping'
import FoodRouter from './routes/sys/food'
import ErrorRouter from './routes/error'
// 链接数据库
import './db/sync'

const app = new Koa();
const Server = require('http').Server(app.callback())
const io = SocketIo(Server)

io.on('connection', socket => {
    // console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
        console.log('客户端发送的内容：', data);
        socket.emit('getMsg', '我是返回的消息... ...');
    })
    socket.emit('socketLoad', 'socket链接成功...')
})
//gzip
app.use(Compress({
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(async (ctx, next) => {
    //ctx 代表响应 ctx.compress = trus 代表允许压缩
    ctx.compress = true
    await next()
})
//配置session
app.keys = [COOKIE_KEY];
app.use(Session({
    key: 'ttaway:sid',
    prefix: 'ttaway:sess:',
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    cookie: {
        path: '/',
        httpOnly: true,  // 客户端不能修改cookie
        maxAge: 24 * 60 * 60 * 1000 // cookie过期时间，ms，自动配置redis过期时间
    },
    // store: redisStore({
    //     // @ts-ignore
    //     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    // })
}));
// 配置跨域
app.use(Cors());
// 配置post请求数据接收
app.use(BodyParser({
    enableTypes: ['json', 'form', 'text']
}));
// 配置静态目录
app.use(Static(path.join(__dirname,'public/')))
// json
app.use(Json());

app.use(ErrorHandle());
// wt token
app.use(Koajwt({
    secret: JWT_KEY,
}).unless({
    path: FilterRoutes
}))

app.use(ShoppingRouter.routes());
app.use(ShoppingRouter.allowedMethods());
// 城市列表
app.use(CityRouter.routes());
app.use(CityRouter.allowedMethods());
// 前端api
app.use(APIRouter.routes());
app.use(APIRouter.allowedMethods());
// 前端用户api
app.use(CenterRouter.routes());
app.use(CenterRouter.allowedMethods());
// 前端订单api
app.use(OrderRouter.routes());
app.use(OrderRouter.allowedMethods());
// 商品分类
app.use(CategorieRouter.routes());
app.use(CategorieRouter.allowedMethods());
// 角色
app.use(RoleRouter.routes());
app.use(RoleRouter.allowedMethods());
// 餐馆特色
app.use(TraitRouter.routes());
app.use(TraitRouter.allowedMethods());
// 优惠活动
app.use(PromotionRouter.routes());
app.use(PromotionRouter.allowedMethods());
// 后台admin
app.use(AdminRouter.routes());
app.use(AdminRouter.allowedMethods());
// 管理员
app.use(ManageRouter.routes());
app.use(ManageRouter.allowedMethods());
// 餐馆
app.use(ShopRouter.routes());
app.use(ShopRouter.allowedMethods());
//食品 
app.use(FoodRouter.routes());
app.use(FoodRouter.allowedMethods());
// 错误页
app.use(ErrorRouter.routes());
app.use(ErrorRouter.allowedMethods());

Server.listen(3001, () => {
    console.log('服务器已经启动，请访问：http://localhost:3001/')
});

