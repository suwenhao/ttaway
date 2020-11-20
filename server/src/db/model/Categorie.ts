/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'

let CategorieSchema = new Mongoose.Schema({
  id: {type: Number},  // 自身id
  parent_id: {type: Number}, // 上级id
  count: {type: Number},  //数量
  image_url: {type: String}, // 图片地址
  name: {type: String}, // 名字
  level: {type: Boolean}, // 等级
});

let CategorieModel = Mongoose.model('categories', CategorieSchema);

export default CategorieModel