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
let AreaSchema = new Schema({
    value: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    parentId: { type: String, required: true },
    pingying: { type: String, required: true },
});
let AreaModel = Mongoose.model('areas', AreaSchema);
exports.default = AreaModel;
//# sourceMappingURL=Area.js.map