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
const trait_1 = require("../../controller/api/trait");
const router = new Router();
router.prefix('/api/trait');
// 获取分类列表
router.get('/list', async (ctx) => {
    let { _id } = ctx.request.query;
    ctx.body = await trait_1.getTraitList(_id);
});
exports.default = router;
//# sourceMappingURL=trait.js.map