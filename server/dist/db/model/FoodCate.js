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
let foodcateSchema = new Schema({
    count: { type: Number, default: 0 },
    image_url: { type: String, default: '' },
    shop_id: Schema.Types.Mixed,
    name: { type: String, default: '' },
    pinyin_name: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: Boolean, default: true },
    create_time: { type: Number, default: Date.now },
    update_time: { type: Number, default: null },
});
let foodcateModel = Mongoose.model('foodcates', foodcateSchema);
foodcateModel.findOne({ name: '热销' }).then(item => {
    if (!item) {
        foodcateModel.create({ name: '热销', shop_id: '0' });
    }
});
foodcateModel.findOne({ name: '优惠' }).then(item => {
    if (!item) {
        foodcateModel.create({ name: '优惠', shop_id: '0' });
    }
});
exports.default = foodcateModel;
//# sourceMappingURL=FoodCate.js.map