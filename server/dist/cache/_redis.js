"use strict";
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const redis = require("redis");
const db_1 = require("../conf/db");
// 创建客户端
const redisClient = redis.createClient(db_1.REDIS_CONF.port, db_1.REDIS_CONF.host);
redisClient.on('error', err => {
    console.log('error: ', err);
});
/**
* redis set
* @param {string} key 键
* @param {string} val 值
* @param {number} timeout 过期时间，单位 s
*/
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
}
exports.set = set;
;
/**
* redis get
* @param {string} key 键
*/
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val == null) {
                resolve(null);
                return;
            }
            try {
                resolve(JSON.parse(val));
            }
            catch (ex) {
                resolve(val);
            }
        });
    });
    return promise;
}
exports.get = get;
exports.default = {
    set,
    get
};
//# sourceMappingURL=_redis.js.map