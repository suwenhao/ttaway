"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arealist = exports.remove = exports.update = exports.create = exports.list = void 0;
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
 * 查询当前用户所有地址
 * @param {string} _id 用户id
 */
exports.list = async (userId) => {
    let params = {
        userId
    };
    try {
        return await index_1.MyaddressModel.find(params);
    }
    catch (error) {
        return null;
    }
};
/**
 * 创建用户地址
 * @param {object} params 要添加的数据
 */
exports.create = async (params) => {
    try {
        return await index_1.MyaddressModel.create(params);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
/**
 * 修改用户地址
 * @param {object} params 要修改的数据
 */
exports.update = async (params) => {
    let data = Object.assign({}, params);
    delete data._id;
    delete data.userId;
    if (data.isDefault) {
        let res = await index_1.MyaddressModel.updateMany({ userId: params.userId }, { $set: { isDefault: false } });
        // console.log(res)
    }
    try {
        return await index_1.MyaddressModel.findOneAndUpdate({ _id: params._id }, data);
    }
    catch (error) {
        return null;
    }
};
/**
 * 删除用户地址
 * @param {object} params 要修改的数据
 */
exports.remove = async (_id) => {
    try {
        return await index_1.MyaddressModel.deleteOne({ _id });
    }
    catch (error) {
        return null;
    }
};
/**
 * 查询当前省市区列表
 */
exports.arealist = async () => {
    let params = {};
    try {
        return await index_1.AreaModel.find(params);
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=center.js.map