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
let CategorieSchema = new Mongoose.Schema({
    id: { type: Number },
    parent_id: { type: Number },
    count: { type: Number },
    image_url: { type: String },
    name: { type: String },
    level: { type: Boolean },
});
let CategorieModel = Mongoose.model('categories', CategorieSchema);
exports.default = CategorieModel;
//# sourceMappingURL=Categorie.js.map