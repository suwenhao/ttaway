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
// @ts-ignore
const index_1 = require("../../utils/index");
const Schema = Mongoose.Schema;
let UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    realName: { type: String, default: `用户${index_1.getName()}` },
    password: { type: String, required: true },
    phone: { type: String, unique: true, default: '' },
    email: { type: String, default: '' },
    avatar_image: { type: String, default: '' },
    create_time: { type: Number, default: Date.now },
    is_new_user: { type: Boolean, default: true },
});
let UserModel = Mongoose.model('users', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map