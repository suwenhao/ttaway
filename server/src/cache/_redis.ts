/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import * as redis from 'redis'

import { REDIS_CONF } from '../conf/db'

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log('error: ', err)
})

/**
* redis set
* @param {string} key 键
* @param {string} val 值
* @param {number} timeout 过期时间，单位 s
*/
export function set(key: string, val: string, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
};

/**
* redis get
* @param {string} key 键
*/
export function get(key: string) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

export default {
  set,
  get
}