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
const city_1 = require("../../controller/api/city");
const router = new Router();
router.prefix('/api/city');
// 获取城市列表
router.get('/list', async (ctx) => {
    let { name } = ctx.request.query;
    ctx.body = await city_1.getCityList(name ? name : null);
});
// 模糊查询当前输入的地址在当前城市的列表
router.get('/address_list', async (ctx) => {
    let query = ctx.request.query;
    ctx.body = await city_1.getSearchAddressList(query);
});
// 获取当前经纬度地址信息
router.get('/address_detail', async (ctx) => {
    let query = ctx.request.query;
    ctx.body = await city_1.getAddrDetail(query);
});
exports.default = router;
//# sourceMappingURL=city.js.map