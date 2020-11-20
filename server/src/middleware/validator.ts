/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { ErrorModel } from '../model/ResModel'
import { jsonSchemaFileInfo, notPermissionFailInfo } from '../model/ErrorInfo'
/**
 * 生产 user json schema 验证中间件
 * @param {object} userValidate 验证函数
 */
export const genValidator = (validateFn: any) => {
  const validator = async (ctx: any, next: any) => {
    const data = ctx.request.body
    if (ctx.manage) {
      const root = ctx.manage.root
      if (!root) {
        // 验证失败
        ctx.body = new ErrorModel(notPermissionFailInfo)
        return
      }
    }
    // 校验
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功 继续
    await next()
  }
  return validator
}

export const genUserValidator = (validateFn: any) => {
  const validator = async (ctx: any, next: any) => {
    const data = ctx.request.body
    // 校验
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功 继续
    await next()
  }
  return validator
}

export const validatorUser = async (ctx: any, next: any) => {
  if (ctx.session.userinfo) {
    // 验证成功 继续
    await next()
  } else {
    // 验证失败
    ctx.status = 401;
    ctx.body = new ErrorModel({
      erron: 401,
      message: '用户信息不存在'
    })
  }
}

export default {
  genValidator,
  genUserValidator,
  validatorUser
}