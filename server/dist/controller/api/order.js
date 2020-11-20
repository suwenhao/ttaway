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
exports.orderList = exports.saveOrder = void 0;
const order_1 = require("../../services/api/order");
const ResModel_1 = require("../../model/ResModel");
const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuid/v1");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  保存订单
 * @param {object} params 订单数据
 */
exports.saveOrder = async (params) => {
    let { remark, json, _id, tel, address, person } = params;
    let name = uuidv1() + ".json";
    let root = path.join(__dirname, "../../json/order/");
    fs.writeFileSync(root + name, JSON.stringify(json));
    let data = {
        userId: _id,
        remark,
        tel,
        address,
        person,
        dataSrc: name,
    };
    console.log(tel, address, person);
    let result = await order_1.save(data);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.saveOrderFailInfo);
    }
};
/**
 *  获取订单列表
 * @param {object} params 数据
 */
exports.orderList = async (params) => {
    let result = await order_1.list(params._id);
    if (result) {
        let root = path.join(__dirname, "../../json/order/");
        for (let i = 0; i < result.length; i++) {
            let data = JSON.parse(fs.readFileSync(root + result[i].dataSrc, "utf8"));
            result[i]._doc.orderData = data;
        }
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.getUserOrderFailInfo);
    }
};
//# sourceMappingURL=order.js.map