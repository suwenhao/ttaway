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
const validator_1 = require("../../middleware/validator");
const router = new Router();
router.prefix('/api');
// 获取验证码
router.get('/sms', async (ctx, next) => {
    const { phone } = ctx.request.query;
    ctx.body = await index_1.getSms({ ctx, phone });
});
// 用户登录
router.post('/login', async (ctx, next) => {
    const { phone, sms } = ctx.request.body;
    ctx.body = await index_1.loginManage({
        phone,
        sms,
        ctx
    });
});
// 退出登录
router.post('/logout', async (ctx, next) => {
    ctx.body = await index_1.logout({
        ctx
    });
});
// 上传文件
router.post('/uploadfile', validator_1.validatorUser, async (ctx, next) => {
    // 获取文件base64
    const { base64, _id, avatar_image } = ctx.request.body;
    ctx.body = await index_1.uploadFile({
        base64, _id, avatar_image
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map