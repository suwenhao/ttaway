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
const order_1 = require("../../controller/api/order");
const validator_1 = require("../../middleware/validator");
const router = new Router();
router.prefix("/api/order");
// 保存订单
router.post("/save", validator_1.validatorUser, async (ctx, next) => {
    let { remark, json, tel, address, person } = ctx.request.body;
    let { _id } = ctx.session.userinfo;
    ctx.body = await order_1.saveOrder({
        remark,
        tel,
        address,
        person,
        json,
        _id,
    });
});
// 获取订单列表
router.get("/list", validator_1.validatorUser, async (ctx, next) => {
    let { _id } = ctx.session.userinfo;
    ctx.body = await order_1.orderList({ _id });
});
exports.default = router;
//# sourceMappingURL=order.js.map