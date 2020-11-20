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
let activitieSchema = new Schema({
    title: String,
    name: String,
    detail: String,
    val: String,
    icon_color: String,
    offer: { type: Boolean, default: false },
    offer_data: String,
    create_time: { type: Number, default: Date.now },
});
let activitieModel = Mongoose.model('activities', activitieSchema);
exports.default = activitieModel;
//# sourceMappingURL=Activitie.js.map