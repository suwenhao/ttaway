"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.remove = exports.idinfo = exports.update = exports.create = exports.getRoleIdManage = exports.info = void 0;
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
 * 获取管理员信息
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
        return await index_1.ManageModel.findOne(params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 根据role_id获取管理员列表
 * @param {string} role_id role_id
 */
exports.getRoleIdManage = async (role_id) => {
    try {
        return await index_1.ManageModel.find({ role_id });
    }
    catch (error) {
        return null;
    }
};
/**
 * 创建管理员
 * @param {string} username 用户名
 * @param {string} password 密码
 */
exports.create = async (params) => {
    try {
        return await index_1.ManageModel.create(params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 修改管理员
 * @param {object} params 要修改的数据
 */
exports.update = async (params) => {
    try {
        return await index_1.ManageModel.findOneAndUpdate({ _id: params._id }, params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 根据_id获取管理员
 * @param {object} _id _id
 */
exports.idinfo = async (_id) => {
    try {
        return await index_1.ManageModel.findOne({ _id }, { password: 0 });
    }
    catch (error) {
        return null;
    }
};
/**
 * 删除管理员
 * @param {object} params 要修改的数据
 */
exports.remove = async (_id) => {
    try {
        return await index_1.ManageModel.deleteOne({ _id });
    }
    catch (error) {
        return null;
    }
};
/**
 * 获取管理员列表
 */
exports.list = async () => {
    try {
        let res = await index_1.ManageModel.aggregate([
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role_id',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $project: { password: 0 }
            }
        ]);
        return res;
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=manage.js.map