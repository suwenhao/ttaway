/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { ErrorModel } from '../model/ResModel'
import { notPermissionFailInfo } from '../model/ErrorInfo'
/**
 * 删除请求 中间件 不是超级管理员无法删除数据
 */
export const reqPermission = () => {
  return async (ctx: any, next: any) => {
    // 校验
    const root = ctx.manage.root
    if (!root) {
      // 验证失败
      ctx.body = new ErrorModel(notPermissionFailInfo)
      return
    }
    // 验证成功 继续
    await next()
  }
}