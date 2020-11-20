"use strict";
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Session = require("koa-generic-session");
const BodyParser = require("koa-bodyparser");
const Compress = require("koa-compress");
const Json = require("koa-json");
const SocketIo = require("socket.io");
const Koajwt = require("koa-jwt");
const Static = require("koa-static");
const path = require("path");
// @ts-ignore
const Cors = require("koa2-cors");
const constant_1 = require("./conf/constant");
// middleware
const errorHandle_1 = require("./middleware/errorHandle");
// router
const routes_1 = require("./filters/routes");
const city_1 = require("./routes/api/city");
const index_1 = require("./routes/api/index");
const center_1 = require("./routes/api/center");
const order_1 = require("./routes/api/order");
const trait_1 = require("./routes/api/trait");
const promotion_1 = require("./routes/api/promotion");
const categorie_1 = require("./routes/api/categorie");
const sys_1 = require("./routes/sys");
const manage_1 = require("./routes/sys/manage");
const role_1 = require("./routes/sys/role");
const shop_1 = require("./routes/sys/shop");
const shopping_1 = require("./routes/api/shopping");
const food_1 = require("./routes/sys/food");
const error_1 = require("./routes/error");
// 链接数据库
require("./db/sync");
const app = new Koa();
const Server = require('http').Server(app.callback());
const io = SocketIo(Server);
io.on('connection', socket => {
    // console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
        console.log('客户端发送的内容：', data);
        socket.emit('getMsg', '我是返回的消息... ...');
    });
    socket.emit('socketLoad', 'socket链接成功...');
});
//gzip
app.use(Compress({
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(async (ctx, next) => {
    //ctx 代表响应 ctx.compress = trus 代表允许压缩
    ctx.compress = true;
    await next();
});
//配置session
app.keys = [constant_1.COOKIE_KEY];
app.use(Session({
    key: 'ttaway:sid',
    prefix: 'ttaway:sess:',
    rolling: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // cookie过期时间，ms，自动配置redis过期时间
    },
}));
// 配置跨域
app.use(Cors());
// 配置post请求数据接收
app.use(BodyParser({
    enableTypes: ['json', 'form', 'text']
}));
// 配置静态目录
app.use(Static(path.join(__dirname, 'public/')));
// json
app.use(Json());
app.use(errorHandle_1.ErrorHandle());
// wt token
app.use(Koajwt({
    secret: constant_1.JWT_KEY,
}).unless({
    path: routes_1.default
}));
app.use(shopping_1.default.routes());
app.use(shopping_1.default.allowedMethods());
// 城市列表
app.use(city_1.default.routes());
app.use(city_1.default.allowedMethods());
// 前端api
app.use(index_1.default.routes());
app.use(index_1.default.allowedMethods());
// 前端用户api
app.use(center_1.default.routes());
app.use(center_1.default.allowedMethods());
// 前端订单api
app.use(order_1.default.routes());
app.use(order_1.default.allowedMethods());
// 商品分类
app.use(categorie_1.default.routes());
app.use(categorie_1.default.allowedMethods());
// 角色
app.use(role_1.default.routes());
app.use(role_1.default.allowedMethods());
// 餐馆特色
app.use(trait_1.default.routes());
app.use(trait_1.default.allowedMethods());
// 优惠活动
app.use(promotion_1.default.routes());
app.use(promotion_1.default.allowedMethods());
// 后台admin
app.use(sys_1.default.routes());
app.use(sys_1.default.allowedMethods());
// 管理员
app.use(manage_1.default.routes());
app.use(manage_1.default.allowedMethods());
// 餐馆
app.use(shop_1.default.routes());
app.use(shop_1.default.allowedMethods());
//食品 
app.use(food_1.default.routes());
app.use(food_1.default.allowedMethods());
// 错误页
app.use(error_1.default.routes());
app.use(error_1.default.allowedMethods());
Server.listen(3001, () => {
    console.log('服务器已经启动，请访问：http://localhost:3001/');
});
//# sourceMappingURL=app.js.map