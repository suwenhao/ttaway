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
const manage_1 = require("../../controller/sys/manage");
const validator_1 = require("../../middleware/validator");
const reqPermission_1 = require("../../middleware/reqPermission");
const manage_2 = require("../../validator/manage");
const router = new Router();
router.prefix('/sys/manage');
// 添加管理员
router.post('/add', validator_1.genValidator(manage_2.manageValidate), async (ctx, next) => {
    const body = ctx.request.body;
    ctx.body = await manage_1.addAndUpdate(body);
});
// 修改管理员
router.post('/update', validator_1.genValidator(manage_2.manageValidate), async (ctx, next) => {
    const body = ctx.request.body;
    ctx.body = await manage_1.addAndUpdate(body);
});
// 删除管理员
router.post('/delete', reqPermission_1.reqPermission(), async (ctx, next) => {
    const { _id } = ctx.request.body;
    ctx.body = await manage_1.deleteManage(_id);
});
// 管理员列表
router.get('/list', async (ctx, next) => {
    ctx.body = await manage_1.getManageList();
});
// 获取更新后的菜单
router.get('/updateinfo', async (ctx, next) => {
    let { _id } = ctx.request.body;
    ctx.body = await manage_1.getNewManage(_id || ctx.manage._id);
});
exports.default = router;
//# sourceMappingURL=manage.js.map