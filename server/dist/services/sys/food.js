"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFood = exports.shopQueryFood = exports.list = exports.remove = exports.removeMore = exports.update = exports.add = void 0;
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const index_1 = require("../../db/model/index");
const Mongoose = require("mongoose");
/**
 * 添加
 * @param {object} params
 */
exports.add = async (params) => {
    try {
        return await index_1.FoodModel.create(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 修改
 * @param {string} _id
 * @param {object} params
 */
exports.update = async (_id, params) => {
    try {
        return await index_1.FoodModel.findOneAndUpdate({ _id }, params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除某餐馆下的食品
 * @param {array} shop_id 餐馆id
 */
exports.removeMore = async (shop_id) => {
    shop_id = Mongoose.Types.ObjectId(shop_id);
    try {
        return await index_1.FoodModel.deleteMany({ shop_id });
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除食品
 * @param {array} _id 食品id
 */
exports.remove = async (_id) => {
    _id = Mongoose.Types.ObjectId(_id);
    try {
        return await index_1.FoodModel.deleteMany({ _id });
    }
    catch (e) {
        return null;
    }
};
/**
 * 获取食品列表
 * @param {object} params 分页数据
 */
exports.list = async (params) => {
    params.offset = params.offset - 1;
    let query = {};
    let skip = params.limit * params.offset;
    try {
        let data = await index_1.FoodModel.find(query).limit(params.limit * 1).skip(skip).sort({ create_time: -1 });
        let count = await index_1.FoodModel.countDocuments(query);
        return {
            data,
            count
        };
    }
    catch (e) {
        return null;
    }
};
/**
 * 根据餐馆获取列表
 * @param {string} shop_id 餐馆id
 */
exports.shopQueryFood = async (shop_id) => {
    let params = {};
    if (shop_id) {
        params.shop_id = shop_id;
    }
    try {
        return await index_1.FoodModel.find(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 根据ID获取详情
 * @param {string} _id 食品id
 */
exports.queryFood = async (_id) => {
    let params = {
        _id
    };
    try {
        return await index_1.FoodModel.findOne(params);
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=food.js.map