/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'

let CitySchema = new Mongoose.Schema({
  id: {type: Number},  // id
  name: {type: String}, // 拼音头字母大写缩写
  abbr: {type: String},  // 详细地址
  area_code: {type: String}, // 地区码
  pinyin: {type: String},  // 拼音
  is_map: {type: Boolean}, // 
  sort: {type: Number},  // 排序
  longitude: {type: Number}, // 经度
  latitude: { type: Number } // 纬度
});

let CityModel = Mongoose.model('citys', CitySchema);

export default CityModel
