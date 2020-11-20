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
let foodSchema = new Schema({
    rating: { type: Number, default: 5.0 },
    is_featured: { type: Number, default: 0 },
    shop_id: { type: Schema.Types.Mixed, isRequired: true },
    foodcate_id: { type: Schema.Types.Mixed, isRequired: true },
    pinyin_name: { type: String, default: '' },
    display_times: { type: Array, default: [] },
    attrs: { type: Array, default: [] },
    description: { type: String, default: "" },
    month_sales: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    tips: String,
    image_path: String,
    specifications: [Schema.Types.Mixed],
    server_utc: { type: Date, default: Date.now },
    is_essential: { type: Boolean, default: false },
    attributes: { type: Array, default: [] },
    limitation: Schema.Types.Mixed,
    name: { type: String, isRequired: true },
    satisfy_count: { type: Number, default: 0 },
    activity: String,
    satisfy_rate: { type: Number, default: 0 },
    discount: { type: Number, default: 10 },
    price: { type: Number, default: 0 },
    packing_fee: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    create_time: { type: Number, default: Date.now },
    update_time: { type: Number },
});
let foodModel = Mongoose.model('foods', foodSchema);
exports.default = foodModel;
//# sourceMappingURL=Food.js.map