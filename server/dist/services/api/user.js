"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.idinfo = exports.update = exports.create = exports.phone = exports.info = void 0;
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const index_1 = require("../../db/model/index");
/**
 * 查询用户是否注册
 * @param {string} username 用户名
 * @param {string} password 密码
 */
exports.info = async (username, password) => {
    let params = {
        username
    };
    if (password) {
        Object.assign(params, { password });
    }
    try {
        return await index_1.UserModel.findOne(params, { password: 0 });
    }
    catch (error) {
        return null;
    }
};
/**
 * 根据手机号码查询用户
 * @param {string} phone 手机号码
 */
exports.phone = async (phone) => {
    let params = {
        phone
    };
    try {
        return await index_1.UserModel.findOne(params, { password: 0 });
    }
    catch (error) {
        return null;
    }
};
/**
 * 创建用户
 * @param {string} username 用户名
 */
exports.create = async (params) => {
    try {
        return await index_1.UserModel.create(params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 修改用户资料
 * @param {object} params 要修改的数据
 */
exports.update = async (params) => {
    try {
        return await index_1.UserModel.findOneAndUpdate({ _id: params._id }, params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 根据_id获取用户信息
 * @param {object} _id _id
 */
exports.idinfo = async (_id) => {
    try {
        return await index_1.UserModel.findOne({ _id }, { password: 0 });
    }
    catch (error) {
        return null;
    }
};
/**
 * 注销用户
 * @param {object} params 要修改的数据
 */
exports.remove = async (_id) => {
    try {
        return await index_1.UserModel.deleteOne({ _id });
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=user.js.map