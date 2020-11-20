/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { Addrole, Editrole, Deleterole, getRoleList, setPermission } from '../../controller/sys/role'
import { reqPermission } from '../../middleware/reqPermission'
const router = new Router();

router.prefix('/sys/role');

// 添加角色
router.post('/add', async (ctx: any) => {
  const { role_name } = ctx.request.body;
  ctx.body = await Addrole(role_name);
});
// 修改角色
router.post('/update', reqPermission(), async (ctx: any) => {
  const { _id, role_name } = ctx.request.body;
  ctx.body = await Editrole(_id, role_name);
});
// 删除角色
router.post('/delete', reqPermission(), async (ctx: any) => {
  const { _id } = ctx.request.body;
  ctx.body = await Deleterole(_id);
});
// 获取角色列表
router.get('/list', async (ctx: any) => {
  const { id } = ctx.request.query;
  ctx.body = await getRoleList(id);
});
// 设置权限
router.post('/set_permission', reqPermission(), async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await setPermission(ctx, body);
})

export default router