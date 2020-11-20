"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const Router = require("koa-router");
const shop_1 = require("../../controller/sys/shop");
const reqPermission_1 = require("../../middleware/reqPermission");
const router = new Router();
router.prefix('/sys/shop');
// 添加餐馆
router.post('/add', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await shop_1.AddShop(body);
});
// 修改餐馆
router.post('/update', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await shop_1.UpdateShop(body);
});
// 删除餐馆
router.post('/delete', reqPermission_1.reqPermission(), async (ctx) => {
    const { _id } = ctx.request.body;
    ctx.body = await shop_1.DeleteShop(_id);
});
// 获取餐馆列表
router.get('/list', async (ctx) => {
    const query = ctx.request.query;
    ctx.body = await shop_1.getShopList(query);
});
// 获取餐馆信息
router.get('/info', async (ctx) => {
    const { _id } = ctx.request.query;
    ctx.body = await shop_1.getShopInfo(_id);
});
// 获取餐馆列表
router.get('/shop_list', async (ctx) => {
    ctx.body = await shop_1.shopList();
});
// 修改餐馆食品安全信息
router.post('/updateinfo', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await shop_1.UpdateInfoShop({
        _id: body._id,
        params: body.data
    });
});
// 获取餐馆食品分类列表
router.get('/catelist', async (ctx) => {
    const { shop_id } = ctx.request.query;
    ctx.body = await shop_1.getShopCateList(shop_id);
});
// 添加餐馆食品分类
router.post('/addcate', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await shop_1.AddShopCate(body);
});
exports.default = router;
//# sourceMappingURL=shop.js.map