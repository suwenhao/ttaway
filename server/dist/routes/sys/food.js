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
const food_1 = require("../../controller/sys/food");
const reqPermission_1 = require("../../middleware/reqPermission");
const router = new Router();
router.prefix('/sys/food');
// 添加食品
router.post('/add', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await food_1.Addfood(body);
});
// 修改食品
router.post('/update', reqPermission_1.reqPermission(), async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await food_1.Editfood(body);
});
// 删除食品
router.post('/delete', reqPermission_1.reqPermission(), async (ctx) => {
    const { _id } = ctx.request.body;
    ctx.body = await food_1.Deletefood(_id);
});
// 获取食品列表
router.get('/list', async (ctx) => {
    const query = ctx.request.query;
    ctx.body = await food_1.getFoodList(query);
});
// 获取食品详情
router.get('/info', async (ctx) => {
    const query = ctx.request.query;
    ctx.body = await food_1.getFoodInfo(query);
});
exports.default = router;
//# sourceMappingURL=food.js.map