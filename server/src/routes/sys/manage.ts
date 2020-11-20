/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { addAndUpdate, deleteManage, getManageList, getNewManage } from '../../controller/sys/manage'
import { genValidator } from '../../middleware/validator'
import { reqPermission } from '../../middleware/reqPermission'
import { manageValidate } from '../../validator/manage'
const router = new Router();

router.prefix('/sys/manage');

// 添加管理员
router.post('/add', genValidator(manageValidate), async (ctx, next) => {
  const body = ctx.request.body
  ctx.body = await addAndUpdate(body)
})
// 修改管理员
router.post('/update', genValidator(manageValidate), async (ctx, next) => {
  const body = ctx.request.body
  ctx.body = await addAndUpdate(body)
})
// 删除管理员
router.post('/delete', reqPermission(), async (ctx, next) => {
  const { _id } = ctx.request.body
  ctx.body = await deleteManage(_id)
})
// 管理员列表
router.get('/list', async (ctx, next) => {
  ctx.body = await getManageList()
})
// 获取更新后的菜单
router.get('/updateinfo', async (ctx: any, next: any) => {
  let {_id} = ctx.request.body
  ctx.body = await getNewManage(_id || ctx.manage._id)
})

export default router