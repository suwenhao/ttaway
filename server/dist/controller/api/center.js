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
exports.deleteAddress = exports.editAddress = exports.addAddress = exports.getAreaData = exports.getAreaList = void 0;
const center_1 = require("../../services/api/center");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 * 获取用户地址列表
 * @param {string} userId 用户ID
 */
exports.getAreaList = async ({ userId }) => {
    let result = await center_1.list(userId);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryMyAddressFailInfo);
    }
};
/**
 * 获取省市区列表
 */
exports.getAreaData = async () => {
    let result = await center_1.arealist();
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryAreaListFailInfo);
    }
};
/**
 * 添加我的地址
 * @param {object} params
 */
exports.addAddress = async (params) => {
    let result = await center_1.create(params);
    console.log(result);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addMyAreaFailInfo);
    }
};
/**
 * 修改我的地址
 * @param {object} params
 */
exports.editAddress = async (params) => {
    let result = await center_1.update(params);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editMyAreaFailInfo);
    }
};
/**
 * 删除我的地址
 * @param {object} params
 */
exports.deleteAddress = async (_id) => {
    let result = await center_1.remove(_id);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editMyAreaFailInfo);
    }
};
//# sourceMappingURL=center.js.map