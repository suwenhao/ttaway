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
exports.getPromotionList = void 0;
const promotion_1 = require("../../services/api/promotion");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  获取优惠活动列表
 * @param {string} _id 查询优惠活动名字
 */
exports.getPromotionList = async (_id) => {
    const promotionlist = await promotion_1.queryPromotionList(_id);
    if (promotionlist) {
        return new ResModel_1.SuccessModel(promotionlist);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryPromotionListFailInfo);
    }
};
//# sourceMappingURL=promotion.js.map