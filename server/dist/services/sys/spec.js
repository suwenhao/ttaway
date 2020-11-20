"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMany = exports.queryMoreIdSpec = exports.addMany = void 0;
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
 * 添加多条数据
 * @param {array} params
 */
exports.addMany = async (params) => {
    try {
        return await index_1.SpecModel.insertMany(params);
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
/**
 * 查询多个规格
 * @param {array} _id[] 规格_id数组
 */
exports.queryMoreIdSpec = async (idArr) => {
    try {
        return await index_1.SpecModel.find({ _id: { $in: idArr } });
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除多同食品下的规格
 * @param {array} food_id  食品id
 */
exports.removeMany = async (food_id) => {
    food_id = Mongoose.Types.ObjectId(food_id);
    try {
        return await index_1.SpecModel.deleteMany({ food_id });
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
//# sourceMappingURL=spec.js.map