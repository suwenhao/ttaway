/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'

const Schema = Mongoose.Schema;
let AreaSchema = new Schema({
  value: { type: String, unique: true, required: true }, // id
  name: { type: String, required: true  }, // 名称
  parentId: { type: String,  required: true },  // 父集id
  pingying: { type: String,  required: true }, // 拼音
});

let AreaModel = Mongoose.model('areas', AreaSchema);

export default AreaModel
