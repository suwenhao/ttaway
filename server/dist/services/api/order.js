"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.save = void 0;
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
 * 保存订单信息
 * @param {object} params 订单数据
 */
exports.save = async (params) => {
    try {
        return await index_1.OrderModel.create(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 获取用户订单列表
 * @param {object} userId 用户id
 */
exports.list = async (userId) => {
    let params = {};
    if (userId) {
        params.userId = userId;
    }
    try {
        return await index_1.OrderModel.find(params);
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=order.js.map