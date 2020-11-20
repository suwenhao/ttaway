/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import mg from './mg'

const db = mg.connection;

// 测试连接

db.on('error', (err) => {
  console.log('mongodb 链接出错')
});
db.once('open', function () {
  console.log('mongodb 链接成功')
});
