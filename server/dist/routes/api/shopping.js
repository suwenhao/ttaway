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
const shopping_1 = require("../../controller/api/shopping");
const router = new Router();
router.prefix('/api/shopping');
// 获取附近商家
router.get('/restaurants', async (ctx) => {
    let query = ctx.request.query;
    ctx.body = await shopping_1.getRestaurantList(query);
});
// 获取附近商家
router.get('/info', async (ctx) => {
    let query = ctx.request.query;
    ctx.body = await shopping_1.getShopInfo(query);
});
exports.default = router;
//# sourceMappingURL=shopping.js.map