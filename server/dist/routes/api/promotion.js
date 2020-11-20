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
const promotion_1 = require("../../controller/api/promotion");
const router = new Router();
router.prefix('/api/promotion');
// 获取分类列表
router.get('/list', async (ctx) => {
    let { _id } = ctx.request.query;
    ctx.body = await promotion_1.getPromotionList(_id);
});
exports.default = router;
//# sourceMappingURL=promotion.js.map