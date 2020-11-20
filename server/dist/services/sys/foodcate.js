"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCate = exports.list = exports.add = void 0;
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
 * @param {object} params
 */
exports.add = async (params) => {
    try {
        return await index_1.FoodCateModel.create(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 获取列表
 * @param {string} shop_id 餐馆id
 */
exports.list = async (shop_id) => {
    try {
        return await index_1.FoodCateModel.find({ shop_id: { $in: ['0', shop_id] } });
    }
    catch (e) {
        return null;
    }
};
/**
 * 根据id获取
 * @param {string} _id 餐馆id
 */
exports.queryCate = async (_id) => {
    try {
        return await index_1.FoodCateModel.findOne({ _id });
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=foodcate.js.map