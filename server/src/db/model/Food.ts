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

let foodSchema = new Schema({
  rating: { type: Number, default: 5.0 }, // 评分
  is_featured: { type: Number, default: 0 }, // 精选
  shop_id: { type: Schema.Types.Mixed, isRequired: true}, // 所属餐馆
  foodcate_id: { type: Schema.Types.Mixed, isRequired: true},   // 所属食品分类
  pinyin_name: { type: String, default: '' }, // 拼音名
  display_times: { type: Array, default: [] }, // 显示时间
  attrs: { type: Array, default: [] },  // 属性
  description: { type: String, default: "" }, // 描述
  month_sales: { type: Number, default: 0 }, // 月销售
  rating_count: { type: Number, default: 0 }, // 评分计数
  tips: String, // 提示
  image_path: String, // 图片路径
  specifications: [Schema.Types.Mixed],  // 规格id组
  server_utc: { type: Date, default: Date.now }, // 服务器标准时间
  is_essential: { type: Boolean, default: false }, // 不可少
  attributes: { type: Array, default: [] },  // 特点
  limitation: Schema.Types.Mixed, // 局限性
  name: { type: String, isRequired: true },  // 食品名字
  satisfy_count: { type: Number, default: 0 }, // 满意计数
  activity: String, // 活动
  satisfy_rate: { type: Number, default: 0 }, // 满意率
  discount: {type: Number, default: 10}, // 折扣
  price: { type: Number, default: 0 },  // 价格
  packing_fee: { type: Number, default: 0 }, // 包装费
  status: { type: Boolean, default: true }, // 状态
  create_time: { type: Number, default: Date.now }, // 创建时间
  update_time: { type: Number }, // 修改时间
});

let foodModel = Mongoose.model('foods', foodSchema);

export default foodModel