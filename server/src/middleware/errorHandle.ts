/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { JWT_KEY } from '../conf/constant'
import * as jwt from 'jsonwebtoken'
import { ErrorModel } from '../model/ResModel'
import { notTokenAndTokenExpiredFileInfo } from '../model/ErrorInfo'


export const ErrorHandle = () => {
  return async (ctx: any, next: any) => {
    try {
      const token = ctx.header.authorization
      if (token) {
        let payload: any;
        try {
          payload = jwt.verify(token.split(" ")[1], JWT_KEY)
          ctx.manage = {
            username: payload.username,
            root: payload.root,
            _id: payload._id
          }
        } catch (error) {
          //token过期 生成新的token
          let newToken = jwt.sign({
            username: ctx.manage.username,
            _id: ctx.manage._id,
            root: ctx.manage.root,
          }, JWT_KEY, { expiresIn: 60 * 30 })
          
          //将新token放入Authorization中返回给前端
          ctx.res.setHeader('Authorization', newToken);
        }
      }
    } catch (error) {}
    return next().catch((err: any) => {
      if (err.status === 401) {
        ctx.status = 401;
        return new ErrorModel(notTokenAndTokenExpiredFileInfo);
      } else {
        throw err;
      }
    })
  }
}

export default {
  ErrorHandle
}