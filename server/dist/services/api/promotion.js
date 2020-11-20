"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPromotionList = void 0;
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
 * 查询优惠活动列表
 * @param {number} _id 查询_id
 */
exports.queryPromotionList = async (_id) => {
    let params = {};
    if (_id) {
        params._id = _id;
    }
    try {
        return await index_1.PromotionModel.find(params).sort({ 'id': 1 });
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=promotion.js.map