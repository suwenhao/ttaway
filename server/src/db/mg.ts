/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

// @ts-ignore
import * as mongoose from "mongoose";
import { DATABASE_CONF } from '../conf/db'

mongoose.set('useCreateIndex', true) //加上这个
// 无用户名密码
mongoose.connect(`mongodb://${DATABASE_CONF.host}:${DATABASE_CONF.port}/${DATABASE_CONF.database}`, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true});
// 有用户名密码              用户名                 密码
// mongoose.connect(`mongodb://${DATABASE_CONF.user}:${DATABASE_CONF.password}@${DATABASE_CONF.host}:${DATABASE_CONF.port}/${DATABASE_CONF.database}`, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true});

export default mongoose