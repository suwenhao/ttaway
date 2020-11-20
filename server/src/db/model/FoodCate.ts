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

let foodcateSchema = new Schema({
  count: { type: Number, default: 0}, // 计数
  image_url: { type: String, default: ''}, // 图片路径
  shop_id: Schema.Types.Mixed, // 所属餐馆
  name: { type: String, default: ''}, // 食品类别名
  pinyin_name: { type: String, default: '' },
  description: { type: String, default: ''},
  status: { type: Boolean, default: true }, // 状态
  create_time: { type: Number, default: Date.now }, // 创建时间
  update_time: { type: Number, default: null }, // 修改时间
});

let foodcateModel = Mongoose.model('foodcates', foodcateSchema);

foodcateModel.findOne({ name: '热销' }).then(item => {
  if (!item) {
    foodcateModel.create({ name: '热销', shop_id: '0'})
  }
})
foodcateModel.findOne({ name: '优惠' }).then(item => {
  if (!item) {
    foodcateModel.create({ name: '优惠', shop_id: '0' })
  }
})

export default foodcateModel