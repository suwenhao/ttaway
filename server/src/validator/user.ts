/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { validator } from './_validator'

const SCHEMA = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 4
    },
    password: {
      type: 'string',
      pattern: '^[0-9a-zA-Z_]{1,}$', //只能用字母、数字或者下划线组成
      maxLength: 255,
      minLength: 4
    },
    new_password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    phone: {
      type: 'string',
      pattern: '^1(3|4|5|6|7|8|9)\d{9}$',
    },
    email: {
      type: 'string',
      pattern: '^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$',
    }
  }
}

// 执行校验
/**
 * 校验用户数据格式
 * @param {object} data 待校验用户数据 
 */
export const userValidate = (data = {}) => {
  return validator(SCHEMA, data)
}

export default {
  userValidate
}