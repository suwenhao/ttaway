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
let OrderSchema = new Schema({
    userId: { type: String },
    dataSrc: { type: String, default: "" },
    orderType: { type: Number, default: 1 },
    tel: { type: String, default: "" },
    person: { type: String, default: "" },
    address: { type: String, default: "" },
    remark: { type: String, default: "" },
    logistics: { type: String, default: "" },
    create_time: { type: Number, default: Date.now },
    pay_time: { type: Number, default: null },
    fahuo_time: { type: Number, default: null },
    update_time: { type: Number, default: null },
    is_update: { type: Boolean, default: false },
});
let OrderModel = Mongoose.model("orders", OrderSchema);
exports.default = OrderModel;
//# sourceMappingURL=Order.js.map