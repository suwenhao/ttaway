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
exports.doCrypto = void 0;
const crypto = require("crypto");
const constant_1 = require("../conf/constant");
/**
 * md5 加密
 * @param {string} content 明文
 */
const _md5 = (content) => {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
};
/**
 * 加密方法
 * @param {string} content 明文
 */
exports.doCrypto = (content) => {
    const str = `password=${content}&key=${constant_1.CRYPTO_SCERET_KEY}`;
    return _md5(str);
};
//# sourceMappingURL=cryp.js.map