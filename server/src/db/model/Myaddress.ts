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
let MyaddressSchema = new Schema({
  name: { type: String, required: true }, // 用户名
  userId: { type: String, required: true }, // 用户Id
  country: {type: String}, // 国家
  province: { type: String, required: true  }, // 省名字
  city: { type: String,  required: true },  // 市名字
  county: { type: String, required: true }, // 区/县名字
  areaCode: { type: String, required: true, default: '' }, // 选中的
  tel: { type: String, required: true }, // 手机号码
  addressDetail: { type: String, default: '' }, // 详细地址
  postalCode: { type: String, default: '' }, // 邮政编码
  isDefault: {type: Boolean, default: false} // 默认地址
});

let MyaddressModel = Mongoose.model('myaddress', MyaddressSchema);

export default MyaddressModel
