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
const sys_1 = require("../../controller/sys");
const validator_1 = require("../../middleware/validator");
const manage_1 = require("../../validator/manage");
const updateFile_1 = require("../../middleware/updateFile");
const router = new Router();
router.prefix('/sys');
// 管理员是否存在
router.post('/is_exist', async (ctx, next) => {
    const { username } = ctx.request.body;
    ctx.body = await sys_1.isExist(username);
});
// 管理员登录
router.post('/login', validator_1.genValidator(manage_1.manageValidate), async (ctx, next) => {
    const { username, password } = ctx.request.body;
    ctx.body = await sys_1.loginManage({
        username,
        password
    });
});
// 上传文件
router.post('/updatefile', updateFile_1.update().single('file'), async (ctx, next) => {
    const file = ctx.req.file; // 获取上传文件
    ctx.body = await sys_1.updateFile(file.filename);
});
exports.default = router;
//# sourceMappingURL=index.js.map