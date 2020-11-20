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

let specSchema = new Schema({
  price: { type: Number, default: 0 }, // 原价
  name: { type: String, isRequired: true }, // 规格名
  shop_id: { type: Schema.Types.Mixed, isRequired: true }, // 所属餐馆
  foodcate_id: { type: Schema.Types.Mixed, isRequired: true }, // 所属食品分类
  packing_fee: { type: Number, default: 0 }, // 包装费
  recent_rating: { type: Number, default: 0 }, // 最近评级
  promotion_stock: { type: Number, default: -1 }, // 促销存货
  sold_out: { type: Boolean, default: false }, // 卖光
  recent_popularity: { type: Number, default: 0 }, // 最近流行度
  is_essential: { type: Boolean, default: false }, // 不可少
  food_id: { type: Schema.Types.Mixed, isRequired: true }, // 所属食品
  checkout_mode: { type: Number, default: 1 }, // 结帐模式
  stock: { type: Number, default: 1000 }, // 股票
  specs_name: String, // 规格组名字
  specs_id: String, // 规格组id
});

let specModel = Mongoose.model('specs', specSchema);

export default specModel