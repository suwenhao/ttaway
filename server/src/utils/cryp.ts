/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import * as crypto from 'crypto'
import { CRYPTO_SCERET_KEY } from '../conf/constant'

/**
 * md5 加密
 * @param {string} content 明文
 */
const _md5 = (content: string) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
export const doCrypto = (content: string) => {
  const str = `password=${content}&key=${CRYPTO_SCERET_KEY}`
  return _md5(str)
}

 