"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryShop = exports.list = exports.remove = exports.update = exports.add = void 0;
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
 * @param {object} params 餐馆资料
 */
exports.add = async (params) => {
    try {
        return await index_1.ShopModel.create(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 更新
 * @param {string} id 角色id
 * @param {object} params 修改餐馆的内容
 */
exports.update = async (_id, params = {}) => {
    try {
        return await index_1.ShopModel.findOneAndUpdate({ _id }, params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除
 * @param {string} _id 餐馆_id
 */
exports.remove = async (_id) => {
    try {
        return await index_1.ShopModel.deleteOne({ _id });
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询餐馆
 * @param {string} params 餐馆分页数据
 */
exports.list = async (params) => {
    if (!params) {
        return await index_1.ShopModel.find();
    }
    params.offset = params.offset - 1;
    let query = {};
    if (params.query) {
        query = params.query;
    }
    let sort = { create_time: -1 };
    if (params.sort) {
        sort = params.sort;
    }
    params.limit = params.limit * 1;
    // console.log(params)
    let skip = params.limit * params.offset;
    try {
        let data = await index_1.ShopModel.find(query).limit(params.limit).skip(skip).sort(sort);
        let count = await index_1.ShopModel.countDocuments(query);
        return {
            data,
            count
        };
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
/**
 * 根据id查询餐馆
 * @param {string} _id 餐馆_id
 */
exports.queryShop = async (_id) => {
    let params = {
        _id
    };
    try {
        return await index_1.ShopModel.findOne(params);
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=shop.js.map