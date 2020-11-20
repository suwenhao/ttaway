"use strict";
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorieList = void 0;
const categorie_1 = require("../../services/api/categorie");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  获取分类列表
 * @param {number} id 查询的城市名字
 */
exports.getCategorieList = async (parent_id) => {
    const categorielist = await categorie_1.queryCategorieList(parent_id);
    if (categorielist) {
        return new ResModel_1.SuccessModel(categorielist);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryCategorieListFailInfo);
    }
};
//# sourceMappingURL=categorie.js.map