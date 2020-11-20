/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { isProd } from '../utils/env'

let REDIS_CONF_M = {
  port: 6379,
  host: '127.0.0.1'
}
let DATABASE_CONF_M = {
  host: 'localhost',
  user: 'ttaway',
  password: 'ttaway',
  port: '27017',
  database: 'ttaway'
}
if (isProd) {
  // 线上环境
  REDIS_CONF_M = {
    port: 6379,
    host: '127.0.0.1'
  }
  // 线上数据库配置
  DATABASE_CONF_M = {
    host: 'localhost',
    user: 'ttaway',
    password: 'ttaway',
    port: '27017',
    database: 'ttaway'
  }
}

export const REDIS_CONF = REDIS_CONF_M
export const DATABASE_CONF = DATABASE_CONF_M