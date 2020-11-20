"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMoreValTrait = exports.queryTraitList = void 0;
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
 * 查询餐馆特点列表
 * @param {number} _id 查询_id
 */
exports.queryTraitList = async (_id) => {
    let params = {};
    if (_id) {
        params._id = _id;
    }
    try {
        return await index_1.TraitModel.find(params).sort({ 'id': 1 });
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询餐馆特点列表
 * @param {array} _id 查询_id数组
 */
exports.queryMoreValTrait = async (valArr) => {
    try {
        return await index_1.TraitModel.find({ val: { $in: valArr } }).sort({ '_id': 1 });
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=trait.js.map