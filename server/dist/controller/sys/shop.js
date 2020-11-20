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
exports.AddShopCate = exports.getShopCateList = exports.getShopInfo = exports.shopList = exports.getShopList = exports.DeleteShop = exports.UpdateInfoShop = exports.UpdateShop = exports.AddShop = void 0;
const shop_1 = require("../../services/sys/shop");
const food_1 = require("../../services/sys/food");
const activitie_1 = require("../../services/sys/activitie");
const spec_1 = require("../../services/sys/spec");
const categorie_1 = require("../../services/api/categorie");
const trait_1 = require("../../services/api/trait");
const foodcate_1 = require("../../services/sys/foodcate");
const ErrorInfo_1 = require("../../model/ErrorInfo");
const ResModel_1 = require("../../model/ResModel");
/**
 *  添加餐馆
 * @param {object} params 餐馆数据
 */
exports.AddShop = async (params) => {
    let activitieArr = params.activitie_data;
    params.aid_list = [];
    for (let i = 0; i < activitieArr.length; i++) {
        let aRes = await activitie_1.add(activitieArr[i]);
        params.aid_list.push(aRes._id);
    }
    const result = await shop_1.add(params);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addShopFailInfo);
    }
};
/**
 *  修改餐馆
 * @param {object} params 餐馆数据
 */
exports.UpdateShop = async (params) => {
    if (!params._id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    const shopRes = await shop_1.queryShop(params._id);
    if (shopRes) {
        // 删除所有当前餐馆的活动
        try {
            await activitie_1.removeMore(shopRes.aid_list);
        }
        catch (error) { }
    }
    // 新增修改带回的活动，保存这些活动的_id
    let activitieArr = params.activitie_data;
    params.aid_list = [];
    for (let i = 0; i < activitieArr.length; i++) {
        let aRes = await activitie_1.add(activitieArr[i]);
        params.aid_list.push(aRes._id);
    }
    const result = await shop_1.update(params._id, params);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editShopFailInfo);
    }
};
/**
 *  修改餐馆信息
 * @param {object} query 餐馆信息数据
 */
exports.UpdateInfoShop = async (query) => {
    if (!query._id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    const result = await shop_1.update(query._id, query.params);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editShopFailInfo);
    }
};
/**
 *  删除餐馆
 * @param {string} role_name 餐馆_id
 */
exports.DeleteShop = async (_id) => {
    if (!_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    try {
        const shopRes = await shop_1.queryShop(_id);
        if (shopRes) {
            try {
                // 删除所有当前餐馆的活动
                await activitie_1.removeMore(shopRes.aid_list);
                let foodList = await food_1.shopQueryFood(_id);
                for (let i = 0; i < foodList.length; i++) {
                    // 删除食品下所有规格
                    await spec_1.removeMany(foodList[i]._id);
                    // 删除所有食品
                    await food_1.removeMore(foodList[i]._id);
                }
            }
            catch (error) { }
        }
        const removeInfo = await shop_1.remove(_id);
        if (removeInfo) {
            return new ResModel_1.SuccessModel(removeInfo);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.removeShopFailInfo);
        }
    }
    catch (error) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.removeShopFailInfo);
    }
};
/**
 *  获取餐馆列表
 * @param {object} query 餐馆请求数据
 */
exports.getShopList = async (query) => {
    try {
        let params = {
            offset: query.offset,
            limit: query.limit,
        };
        if (query.search) {
            let reg = new RegExp(query.search, 'i');
            params.query = {
                name: { $regex: reg }
            };
        }
        const result = await shop_1.list(params);
        if (result) {
            try {
                for (let i = 0; i < result.data.length; i++) {
                    let activitie_data = await activitie_1.queryMoreIdActivitie(result.data[i].aid_list);
                    result.data[i]._doc.activitie_data = activitie_data;
                    let category_data = await categorie_1.queryMoreIdCategorie(result.data[i].category);
                    result.data[i]._doc.category_data = category_data;
                    let trait_data = await trait_1.queryMoreValTrait(result.data[i].trait);
                    result.data[i]._doc.trait_data = trait_data;
                }
                return new ResModel_1.SuccessModel({
                    offset: query.offset * 1 + 1,
                    limit: query.limit * 1,
                    total: result.count,
                    data: result.data
                });
            }
            catch (error) {
                return new ResModel_1.ErrorModel(ErrorInfo_1.shopListFailInfo);
            }
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.shopListFailInfo);
        }
    }
    catch (error) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopListFailInfo);
    }
};
/**
 *  获取所有餐馆列表
 */
exports.shopList = async () => {
    const result = await shop_1.list(null);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopListFailInfo);
    }
};
/**
 *  获取餐馆详细信息
 * @param {string} _id 餐馆_id
 */
exports.getShopInfo = async (_id) => {
    if (!_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    let result = await shop_1.queryShop(_id);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopInfoFailInfo);
    }
};
/**
 * 获取餐馆食品分类
 * @param {string} shop_id 餐馆id
 */
exports.getShopCateList = async (shop_id) => {
    if (!shop_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    try {
        const result = await foodcate_1.list(shop_id);
        if (result) {
            return new ResModel_1.SuccessModel(result);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.foodCateListFailInfo);
        }
    }
    catch (error) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.foodCateListFailInfo);
    }
};
/**
 * 添加餐馆食品分类
 * @param {object} params 餐馆id
 */
exports.AddShopCate = async (params) => {
    if (!params.shop_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.shopNotIDFailInfo);
    }
    try {
        let result = await foodcate_1.add(params);
        if (result) {
            return new ResModel_1.SuccessModel(result);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.addFoodCateFailInfo);
        }
    }
    catch (error) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addFoodCateFailInfo);
    }
};
//# sourceMappingURL=shop.js.map