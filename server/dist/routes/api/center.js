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
const index_1 = require("../../controller/api/index");
const center_1 = require("../../controller/api/center");
const validator_1 = require("../../middleware/validator");
const router = new Router();
router.prefix('/api/center');
// 获取用户信息
router.get('/info', validator_1.validatorUser, async (ctx, next) => {
    const { _id } = ctx.request.query;
    ctx.body = await index_1.getInfo({
        _id,
    });
});
// 获取用户地址列表
router.get('/myaddress', validator_1.validatorUser, async (ctx, next) => {
    const { userId } = ctx.request.query;
    ctx.body = await center_1.getAreaList({
        userId,
    });
});
// 获取用户地址列表
router.get('/area', validator_1.validatorUser, async (ctx, next) => {
    ctx.body = await center_1.getAreaData();
});
// 用户地址添加
router.post('/add_address', validator_1.validatorUser, async (ctx, next) => {
    const params = ctx.request.body;
    ctx.body = await center_1.addAddress(params);
});
// 用户地址修改
router.post('/edit_address', validator_1.validatorUser, async (ctx, next) => {
    const params = ctx.request.body;
    ctx.body = await center_1.editAddress(params);
});
// 删除用户地址
router.post('/delete_address', validator_1.validatorUser, async (ctx, next) => {
    const { _id } = ctx.request.body;
    ctx.body = await center_1.deleteAddress(_id);
});
exports.default = router;
//# sourceMappingURL=center.js.map