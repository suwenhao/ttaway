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
let CitySchema = new Mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    abbr: { type: String },
    area_code: { type: String },
    pinyin: { type: String },
    is_map: { type: Boolean },
    sort: { type: Number },
    longitude: { type: Number },
    latitude: { type: Number } // 纬度
});
let CityModel = Mongoose.model('citys', CitySchema);
exports.default = CityModel;
//# sourceMappingURL=City.js.map