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
exports.getAddrDetail = exports.getSearchAddressList = exports.getCityList = void 0;
const city_1 = require("../../services/api/city");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  获取城市列表
 * @param {string} name 查询的城市名字
 */
exports.getCityList = async (name) => {
    const citylist = await city_1.queryCityList(name);
    if (citylist) {
        return new ResModel_1.SuccessModel(citylist);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryCityListFailInfo);
    }
};
/**
 *   模糊查询当前输入的地址在当前城市的列表
 * @param {object} query 地图需要的参数
 */
exports.getSearchAddressList = async (query) => {
    const addresslist = await city_1.querySearchAddressList(query);
    if (addresslist) {
        return new ResModel_1.SuccessModel(addresslist);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.querySearchAddressListFailInfo);
    }
};
/**
 *   获取当前经纬度地址信息
 * @param {object} query 地图需要的参数
 */
exports.getAddrDetail = async (query) => {
    // console.log(query.geohash)
    const address = await city_1.queryAddrDetail(query.geohash);
    if (address) {
        return new ResModel_1.SuccessModel(address);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.querySearchAddressFailInfo);
    }
};
//# sourceMappingURL=city.js.map