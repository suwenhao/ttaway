"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
let shopSchema = new Schema({
    name: { type: String },
    city: String,
    address: Object,
    phone: String,
    introduction: String,
    slogan: String,
    category: Array,
    trait: Array,
    shipping_fee: Array,
    starting_price: Number,
    startTime: String,
    endTime: String,
    avatar_image: String,
    business_license_image: String,
    catering_service_license_image: String,
    promotion: Array,
    aid_list: Array,
    order_lead_time: { type: String, default: "" },
    // 食品安全鉴定
    identification: {
        company_name: { type: String, default: "" },
        identificate_agency: { type: String, default: "" },
        identificate_date: { type: Number, default: null },
        legal_person: { type: String, default: "" },
        licenses_date: { type: Number, default: null },
        licenses_number: { type: String, default: "" },
        licenses_scope: { type: String, default: "" },
        operation_period: { type: String, default: "" },
        registered_address: { type: String, default: "" },
        registered_number: { type: Number, default: 1000000 },
    },
    shop_header_image: { type: String, default: '' },
    // 餐馆实景
    real_scene: {
        lobby: Array,
        facade: Array,
    },
    // 分段代理费
    piecewise_agent_fee: String,
    promotion_info: {
        type: String, default: "欢迎光临"
    },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    recent_order_num: { type: Number, default: 0 },
    create_time: { type: Number, default: Date.now },
    update_time: { type: Number },
    sale: { type: Number, default: 0 },
});
let shopModel = Mongoose.model('shops', shopSchema);
exports.default = shopModel;
//# sourceMappingURL=Shop.js.map