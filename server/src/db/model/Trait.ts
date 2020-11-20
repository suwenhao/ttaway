/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'

const Schema = Mongoose.Schema

let traitSchema = new Schema({
  id: Number, // id
  description: String, // 描述
  icon_color: String, // 颜色
  icon_name: String, // 名字头
  name: String, // 名字
  val: String, // value
  create_time: { type: Number, default: Date.now }, // 创建时间
});

let traitModel = Mongoose.model('traits', traitSchema);

export default traitModel