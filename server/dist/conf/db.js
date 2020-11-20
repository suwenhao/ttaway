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
exports.DATABASE_CONF = exports.REDIS_CONF = void 0;
const env_1 = require("../utils/env");
let REDIS_CONF_M = {
    port: 6379,
    host: '127.0.0.1'
};
let DATABASE_CONF_M = {
    host: 'localhost',
    user: 'ttaway',
    password: 'ttaway',
    port: '27017',
    database: 'ttaway'
};
if (env_1.isProd) {
    // 线上环境
    REDIS_CONF_M = {
        port: 6379,
        host: '127.0.0.1'
    };
    // 线上数据库配置
    DATABASE_CONF_M = {
        host: 'localhost',
        user: 'ttaway',
        password: 'ttaway',
        port: '27017',
        database: 'ttaway'
    };
}
exports.REDIS_CONF = REDIS_CONF_M;
exports.DATABASE_CONF = DATABASE_CONF_M;
//# sourceMappingURL=db.js.map