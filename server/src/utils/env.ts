/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

const ENV = process.env.NODE_ENV

export const isDev = ENV === 'dev'
export const notDev = ENV !== 'dev'
export const isProd = ENV === 'production'
export const notProd = ENV !== 'production'
export const isTest = ENV === 'test'
export const notTest = ENV !== 'test'