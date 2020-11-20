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
let promotionSchema = new Schema({
    id: Number,
    icon_color: String,
    icon_name: String,
    name: String,
    create_time: { type: Number, default: Date.now },
});
let promotionModel = Mongoose.model('promotions', promotionSchema);
exports.default = promotionModel;
//# sourceMappingURL=Promotion.js.map