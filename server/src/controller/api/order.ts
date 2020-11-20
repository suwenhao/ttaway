/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { save, list } from "../../services/api/order";
import { SuccessModel, ErrorModel } from "../../model/ResModel";
import * as fs from "fs";
import * as path from "path";
import * as uuidv1 from "uuid/v1";
import { saveOrderFailInfo, getUserOrderFailInfo } from "../../model/ErrorInfo";

/**
 *  保存订单
 * @param {object} params 订单数据
 */
export const saveOrder = async (params: any) => {
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
  let result = await save(data);
  if (result) {
    return new SuccessModel(result);
  } else {
    return new ErrorModel(saveOrderFailInfo);
  }
};
/**
 *  获取订单列表
 * @param {object} params 数据
 */
export const orderList = async (params: any) => {
  let result: any = await list(params._id);
  if (result) {
    let root = path.join(__dirname, "../../json/order/");
    for (let i = 0; i < result.length; i++) {
      let data = JSON.parse(fs.readFileSync(root + result[i].dataSrc, "utf8"));
      result[i]._doc.orderData = data;
    }
    return new SuccessModel(result);
  } else {
    return new ErrorModel(getUserOrderFailInfo);
  }
};
