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
const Router = require("koa-router");
const ResModel_1 = require("../model/ResModel");
const ErrorInfo_1 = require("../model/ErrorInfo");
const router = new Router();
router.get('*', async (ctx, next) => {
    ctx.body = new ResModel_1.ErrorModel(ErrorInfo_1.notPageFailInfo);
});
exports.default = router;
//# sourceMappingURL=error.js.map