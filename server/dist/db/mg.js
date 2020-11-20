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
// @ts-ignore
const mongoose = require("mongoose");
const db_1 = require("../conf/db");
mongoose.set('useCreateIndex', true); //加上这个
// 无用户名密码
mongoose.connect(`mongodb://${db_1.DATABASE_CONF.host}:${db_1.DATABASE_CONF.port}/${db_1.DATABASE_CONF.database}`, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true });
// 有用户名密码              用户名                 密码
// mongoose.connect(`mongodb://${DATABASE_CONF.user}:${DATABASE_CONF.password}@${DATABASE_CONF.host}:${DATABASE_CONF.port}/${DATABASE_CONF.database}`, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true});
exports.default = mongoose;
//# sourceMappingURL=mg.js.map