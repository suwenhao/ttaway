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
let specSchema = new Schema({
    price: { type: Number, default: 0 },
    name: { type: String, isRequired: true },
    shop_id: { type: Schema.Types.Mixed, isRequired: true },
    foodcate_id: { type: Schema.Types.Mixed, isRequired: true },
    packing_fee: { type: Number, default: 0 },
    recent_rating: { type: Number, default: 0 },
    promotion_stock: { type: Number, default: -1 },
    sold_out: { type: Boolean, default: false },
    recent_popularity: { type: Number, default: 0 },
    is_essential: { type: Boolean, default: false },
    food_id: { type: Schema.Types.Mixed, isRequired: true },
    checkout_mode: { type: Number, default: 1 },
    stock: { type: Number, default: 1000 },
    specs_name: String,
    specs_id: String,
});
let specModel = Mongoose.model('specs', specSchema);
exports.default = specModel;
//# sourceMappingURL=Spec.js.map