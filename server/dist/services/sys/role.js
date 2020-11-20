"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRole = exports.remove = exports.update = exports.add = void 0;
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
 * 添加
 * @param {string} role_name 角色名字
 */
exports.add = async (role_name) => {
    try {
        return await index_1.RoleModel.create({ name: role_name });
    }
    catch (e) {
        return null;
    }
};
/**
 * 更新
 * @param {string} id 角色id
 * @param {object} params 修改角色的内容
 */
exports.update = async (_id, params = {}) => {
    try {
        return await index_1.RoleModel.findOneAndUpdate({ _id }, params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除角色
 * @param {string} _id 角色id
 */
exports.remove = async (_id) => {
    try {
        return await index_1.RoleModel.deleteOne({ _id });
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询角色
 * @param {string} _id 角色_id
 */
exports.queryRole = async (_id) => {
    let params = {};
    if (_id) {
        params._id = _id;
    }
    try {
        return _id ? await index_1.RoleModel.findOne(params) : await index_1.RoleModel.find(params);
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=role.js.map