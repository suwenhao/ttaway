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
let traitSchema = new Schema({
    id: Number,
    description: String,
    icon_color: String,
    icon_name: String,
    name: String,
    val: String,
    create_time: { type: Number, default: Date.now },
});
let traitModel = Mongoose.model('traits', traitSchema);
exports.default = traitModel;
//# sourceMappingURL=Trait.js.map