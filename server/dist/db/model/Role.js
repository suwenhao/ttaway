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
let roleSchema = new Mongoose.Schema({
    name: { type: String },
    auth_name: String,
    auth_time: Number,
    create_time: { type: Number, default: Date.now },
    menus: { type: Array, default: ['/home'] } // 所有有权限操作的菜单path的数组
});
let roleModel = Mongoose.model('roles', roleSchema);
exports.default = roleModel;
//# sourceMappingURL=Role.js.map