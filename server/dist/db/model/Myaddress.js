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
let MyaddressSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    country: { type: String },
    province: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    areaCode: { type: String, required: true, default: '' },
    tel: { type: String, required: true },
    addressDetail: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    isDefault: { type: Boolean, default: false } // 默认地址
});
let MyaddressModel = Mongoose.model('myaddress', MyaddressSchema);
exports.default = MyaddressModel;
//# sourceMappingURL=Myaddress.js.map