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
exports.getFoodInfo = exports.getFoodList = exports.Deletefood = exports.Editfood = exports.Addfood = void 0;
const food_1 = require("../../services/sys/food");
const shop_1 = require("../../services/sys/shop");
const spec_1 = require("../../services/sys/spec");
const foodcate_1 = require("../../services/sys/foodcate");
// @ts-ignore
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
const format_1 = require("../../utils/format");
/**
 *  添加食品
 * @param {object} params 食品对象
 */
exports.Addfood = async (params) => {
    let { shop_id, foodcate_id, name, description, activity, image_path, attributes, discount, price, packing_fee, } = params;
    let data = {
        shop_id,
        foodcate_id,
        name,
        description,
        image_path,
        activity,
        discount,
        attributes,
        price,
        packing_fee,
    };
    const result = await food_1.add(data);
    if (result) {
        try {
            let newSpecs = format_1.formatSpecs(params, result._id);
            let specsRes = await spec_1.addMany(newSpecs);
            // console.log(specsRes)
            let specifications = specsRes.map((item) => {
                return item._id;
            });
            let updateRes = await food_1.update(result._id, {
                specifications
            });
            return new ResModel_1.SuccessModel(updateRes);
        }
        catch (error) {
            return new ResModel_1.ErrorModel(ErrorInfo_1.addFoodFailInfo);
        }
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addFoodFailInfo);
    }
};
/**
 *  修改食品
 * @param {object} params 食品对象
 */
exports.Editfood = async (params) => {
    let { foodcate_id, name, description, image_path, activity, discount, attributes, price, packing_fee, } = params;
    let data = {
        foodcate_id,
        name,
        description,
        image_path,
        activity,
        discount,
        attributes,
        price,
        packing_fee,
    };
    const result = await food_1.update({ _id: params._id }, data);
    if (result) {
        // 删除当前食品下的所有规格
        let res = await spec_1.removeMany(params._id);
        console.log(params._id, res);
        if (res) {
            // 新建规格
            let newSpecs = format_1.formatSpecs(params, result._id);
            let specsRes = await spec_1.addMany(newSpecs);
            // console.log(specsRes)
            let specifications = specsRes.map((item) => {
                return item._id;
            });
            await food_1.update(result._id, {
                specifications
            });
            return new ResModel_1.SuccessModel(result);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.editFoodFailInfo);
        }
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editFoodFailInfo);
    }
};
/**
 *  删除食品
 * @param {string} _id 食品id
 */
exports.Deletefood = async (_id) => {
    // 删除当前食品下的所有规格
    let res = await spec_1.removeMany(_id);
    const result = await food_1.remove(_id);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.removeFoodFailInfo);
    }
};
/**
 *  获取食品列表
 * @param {object} query
 */
exports.getFoodList = async (query) => {
    const result = await food_1.list(query);
    if (result) {
        for (let i = 0; i < result.data.length; i++) {
            try {
                let shopRes = await shop_1.queryShop(result.data[i].shop_id);
                // console.log(result.data[i].shop_id, shopRes)
                result.data[i]._doc.shopInfo = shopRes;
            }
            catch (error) {
                result.data[i]._doc.shopInfo = null;
            }
            try {
                let foodCateRes = await foodcate_1.queryCate(result.data[i].foodcate_id);
                result.data[i]._doc.cateInfo = foodCateRes;
            }
            catch (error) {
                result.data[i]._doc.cateInfo = null;
            }
        }
        return new ResModel_1.SuccessModel({
            offset: query.offset * 1 + 1,
            limit: query.limit * 1,
            total: result.count,
            data: result.data
        });
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.foodListFailInfo);
    }
};
/**
 *  获取食品详情
 * @param {object} query
 */
exports.getFoodInfo = async (query) => {
    try {
        let { _id } = query;
        let result = await food_1.queryFood({ _id });
        if (result) {
            console.log(result);
            let specifications = result.specifications;
            let specs = await spec_1.queryMoreIdSpec(specifications);
            result._doc.specs = specs;
            return new ResModel_1.SuccessModel(result);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.queryFoodInfoFailInfo);
        }
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=food.js.map