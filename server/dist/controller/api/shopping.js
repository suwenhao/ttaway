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
exports.getShopInfo = exports.getRestaurantList = void 0;
const shop_1 = require("../../services/sys/shop");
const activitie_1 = require("../../services/sys/activitie");
const categorie_1 = require("../../services/api/categorie");
const trait_1 = require("../../services/api/trait");
const city_1 = require("../../services/api/city");
const food_1 = require("../../services/sys/food");
const spec_1 = require("../../services/sys/spec");
const foodcate_1 = require("../../services/sys/foodcate");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 *  获取餐馆列表
 * @param {object} query
 */
exports.getRestaurantList = async (query) => {
    const { offset, limit, startgeohash, promotion } = query;
    let params = {
        offset,
        limit,
    };
    if (promotion) {
        params.query = {
            promotion: { $elemMatch: { $eq: promotion } }
        };
    }
    const reslist = await shop_1.list(params);
    if (reslist) {
        try {
            for (let i = 0; i < reslist.data.length; i++) {
                let activitie_data = await activitie_1.queryMoreIdActivitie(reslist.data[i].aid_list);
                reslist.data[i]._doc.activitie_data = activitie_data;
                let category_data = await categorie_1.queryMoreIdCategorie(reslist.data[i].category);
                reslist.data[i]._doc.category_data = category_data;
                let trait_data = await trait_1.queryMoreValTrait(reslist.data[i].trait);
                reslist.data[i]._doc.trait_data = trait_data;
                let endgeohash = reslist.data[i].address.geohash;
                let distance = await city_1.queryDistance(startgeohash, endgeohash);
                if (!distance) {
                    distance = [{ distance: 2528, order_lead_time: '29分钟' }];
                }
                reslist.data[i]._doc.distance = distance[0];
                reslist.data[i]._doc.distanceValue = distance[0].distance;
            }
            let data = Object.assign([], reslist.data);
            return new ResModel_1.SuccessModel({
                offset: query.offset * 1,
                limit: query.limit * 1,
                total: reslist.count,
                data
            });
        }
        catch (error) {
            console.log(error);
            return new ResModel_1.ErrorModel(ErrorInfo_1.queryRestaurantListFailInfo);
        }
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryRestaurantListFailInfo);
    }
};
/**
 *  获取餐馆详情
 * @param {object} query
 */
exports.getShopInfo = async (query) => {
    let { _id, startgeohash } = query;
    let result = await shop_1.queryShop(_id);
    if (result) {
        try {
            let activitie_data = await activitie_1.queryMoreIdActivitie(result.aid_list);
            let category_data = await categorie_1.queryMoreIdCategorie(result.category);
            result._doc.category_data = category_data;
            let trait_data = await trait_1.queryMoreValTrait(result.trait);
            result._doc.trait_data = trait_data;
            result._doc.activitie_data = activitie_data;
            let endgeohash = result.address.geohash;
            let distance = await city_1.queryDistance(startgeohash, endgeohash);
            // console.log(distance)
            if (!distance) {
                distance = [{ distance: 2528, order_lead_time: '29分钟' }];
            }
            result._doc.distance = distance[0];
            result._doc.distanceValue = distance[0].distance;
            let foodRes = await food_1.shopQueryFood(_id);
            for (let i = 0; i < foodRes.length; i++) {
                let specifications = foodRes[i].specifications;
                let specs = await spec_1.queryMoreIdSpec(specifications);
                foodRes[i]._doc.specs = specs;
                let foodCateRes = await foodcate_1.queryCate(foodRes[i].foodcate_id);
                foodRes[i]._doc.cateInfo = foodCateRes;
            }
            // console.log(foodRes)
            result._doc.foods = foodRes;
        }
        catch (error) { }
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.SuccessModel(null);
    }
};
//# sourceMappingURL=shopping.js.map