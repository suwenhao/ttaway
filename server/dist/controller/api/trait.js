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
exports.getTraitList = void 0;
const trait_1 = require("../../services/api/trait");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  获取餐馆特点列表
 * @param {string} _id 查询的城市名字
 */
exports.getTraitList = async (_id) => {
    const traitlist = await trait_1.queryTraitList(_id);
    if (traitlist) {
        return new ResModel_1.SuccessModel(traitlist);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryTraitListFailInfo);
    }
};
//# sourceMappingURL=trait.js.map