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
const role_1 = require("../../controller/sys/role");
const reqPermission_1 = require("../../middleware/reqPermission");
const router = new Router();
router.prefix('/sys/role');
// 添加角色
router.post('/add', async (ctx) => {
    const { role_name } = ctx.request.body;
    ctx.body = await role_1.Addrole(role_name);
});
// 修改角色
router.post('/update', reqPermission_1.reqPermission(), async (ctx) => {
    const { _id, role_name } = ctx.request.body;
    ctx.body = await role_1.Editrole(_id, role_name);
});
// 删除角色
router.post('/delete', reqPermission_1.reqPermission(), async (ctx) => {
    const { _id } = ctx.request.body;
    ctx.body = await role_1.Deleterole(_id);
});
// 获取角色列表
router.get('/list', async (ctx) => {
    const { id } = ctx.request.query;
    ctx.body = await role_1.getRoleList(id);
});
// 设置权限
router.post('/set_permission', reqPermission_1.reqPermission(), async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await role_1.setPermission(ctx, body);
});
exports.default = router;
//# sourceMappingURL=role.js.map