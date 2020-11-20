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
const cryp_1 = require("../../utils/cryp");
const Schema = Mongoose.Schema;
let ManageSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: String,
    email: String,
    create_time: { type: Number, default: Date.now },
    root: { type: Boolean, default: false },
    role_id: {
        type: Schema.Types.ObjectId,
    }
});
let ManageModel = Mongoose.model('manages', ManageSchema);
// 初始化默认超级管理员用户: admin/admin
ManageModel.findOne({ username: 'admin' }).then(user => {
    if (!user) {
        ManageModel.create({ username: 'admin', password: cryp_1.doCrypto('admin'), root: true })
            .then(user => {
            console.log('初始化用户: 用户名: admin 密码为: admin');
        });
    }
});
exports.default = ManageModel;
//# sourceMappingURL=Manage.js.map