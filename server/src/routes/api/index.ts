/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getSms, loginManage, logout, uploadFile } from '../../controller/api/index'
import { validatorUser } from '../../middleware/validator'
const router = new Router();

router.prefix('/api');

// 获取验证码
router.get('/sms', async (ctx, next) => {
  const { phone } = ctx.request.query
  ctx.body = await getSms({ctx, phone})
})

// 用户登录
router.post('/login', async (ctx, next) => {
  const { phone, sms } = ctx.request.body
  ctx.body = await loginManage({
    phone,
    sms,
    ctx
  })
})
// 退出登录
router.post('/logout', async (ctx, next) => {
  ctx.body = await logout({
    ctx
  })
})
// 上传文件
router.post('/uploadfile', validatorUser, async (ctx: any, next) => {
  // 获取文件base64
  const { base64, _id, avatar_image } = ctx.request.body;
  ctx.body = await uploadFile({
    base64, _id, avatar_image
  })
})
export default router