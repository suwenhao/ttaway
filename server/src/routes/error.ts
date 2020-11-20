/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import * as Router from 'koa-router'
import { ErrorModel } from '../model/ResModel'
import { notPageFailInfo } from '../model/ErrorInfo'
const router = new Router();

router.get('*', async (ctx, next) => {
  ctx.body = new ErrorModel(notPageFailInfo)
})

export default router