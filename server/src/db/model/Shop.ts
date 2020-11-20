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

let shopSchema = new Schema({
  name: { type: String }, // 餐馆名称
  city: String,
  address: Object, // 详细地址
  phone: String, // 联系电话
  introduction: String, // 餐馆简介
  slogan: String, // 餐馆标语
  category: Array, // 餐馆分类
  trait: Array,// 餐馆特点
  shipping_fee: Array, // 配送费[5, 10]
  starting_price: Number, // 起送价 20  
  startTime: String,  // 营业开始时间
  endTime: String,  // 营业结束时间
  avatar_image: String,  // 餐馆头像
  business_license_image: String, // 营业执照
  catering_service_license_image: String,// 餐饮服务许可证
  promotion: Array, // 优惠活动
  aid_list: Array, // 优惠活动id
  order_lead_time: { type: String, default: "" }, // 订单交货时间
  // 食品安全鉴定
  identification: {
    company_name: { type: String, default: "" }, // 企业名称名
    identificate_agency: { type: String, default: "" }, // 鉴定机构
    identificate_date: { type: Number, default: null }, // 发证鉴定日期
    legal_person: { type: String, default: "" }, // 法定代表人
    licenses_date: { type: Number, default: null }, // 许可有效日期
    licenses_number: { type: String, default: "" }, // 许可证执照号码
    licenses_scope: { type: String, default: "" }, // 许可营业范围
    operation_period: { type: String, default: "" }, // 运营期
    registered_address: { type: String, default: "" }, // 注册地址
    registered_number: { type: Number, default: 1000000 }, // 注册资本
  },
  shop_header_image: { type: String, default: ''},  // 门店头图片
  // 餐馆实景
  real_scene: {
    lobby: Array, // 大堂
    facade: Array, // 门面
  },
  // 分段代理费
  piecewise_agent_fee: String,
  promotion_info: {
    type: String, default: "欢迎光临"
  },
  rating: { type: Number, default: 0 }, // 评分
  rating_count: { type: Number, default: 0 }, // 评分数
  status: { type: Boolean, default: true }, // 状态
  recent_order_num: { type: Number, default: 0 }, // 最近订单号
  create_time: { type: Number, default: Date.now }, // 创建时间
  update_time: { type: Number }, // 修改时间
  sale: { type: Number, default: 0 }, // 销量
});

let shopModel = Mongoose.model('shops', shopSchema);

export default shopModel