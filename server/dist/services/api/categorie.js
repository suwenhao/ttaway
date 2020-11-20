"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMoreIdCategorie = exports.queryCategorieList = void 0;
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
 * 查询分类列表
 * @param {number} id 查询id
 */
exports.queryCategorieList = async (parent_id) => {
    let params = {};
    if (parent_id) {
        params.parent_id = parent_id;
    }
    try {
        return await index_1.CategorieModel.find(params).sort({ 'id': 1 });
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询多个分类返回列表
 * @param {number} id 查询id数组
 */
exports.queryMoreIdCategorie = async (idArr) => {
    try {
        return await index_1.CategorieModel.find({ id: { $in: idArr } }).sort({ id: 1 });
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=categorie.js.map