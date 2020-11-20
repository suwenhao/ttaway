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
const mg_1 = require("./mg");
const db = mg_1.default.connection;
// 测试连接
db.on('error', (err) => {
    console.log('mongodb 链接出错');
});
db.once('open', function () {
    console.log('mongodb 链接成功');
});
//# sourceMappingURL=sync.js.map