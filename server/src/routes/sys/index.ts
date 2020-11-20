/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { isExist, loginManage, updateFile } from '../../controller/sys'
import { genValidator } from '../../middleware/validator'
import { manageValidate } from '../../validator/manage'
import { update } from '../../middleware/updateFile'
const router = new Router();

router.prefix('/sys');

// 管理员是否存在
router.post('/is_exist', async (ctx, next) => {
  const { username } = ctx.request.body
  ctx.body = await isExist(username)
})

// 管理员登录
router.post('/login', genValidator(manageValidate), async (ctx, next) => {
  const { username, password } = ctx.request.body
  ctx.body = await loginManage({
    username,
    password
  })
})
// 上传文件
router.post('/updatefile', update().single('file'), async (ctx: any, next) => {
  const file = ctx.req.file; // 获取上传文件
  ctx.body = await updateFile(file.filename)
})

export default router