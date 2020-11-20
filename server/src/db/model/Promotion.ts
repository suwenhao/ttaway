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

let promotionSchema = new Schema({
  id: Number,
  icon_color: String, // 颜色
  icon_name: String, // 首字
  name: String, // 名字
  create_time: { type: Number, default: Date.now }, // 创建时间
});

let promotionModel = Mongoose.model('promotions', promotionSchema);

export default promotionModel