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
const categorie_1 = require("../../controller/api/categorie");
const router = new Router();
router.prefix('/api/categorie');
// 获取分类列表
router.get('/list', async (ctx) => {
    let { parent_id } = ctx.request.query;
    ctx.body = await categorie_1.getCategorieList(parent_id);
});
exports.default = router;
//# sourceMappingURL=categorie.js.map