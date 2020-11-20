"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAddrDetail = exports.queryDistance = exports.querySearchAddressList = exports.queryCityList = void 0;
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const axios_1 = require("axios");
const index_1 = require("../../db/model/index");
const constant_1 = require("../../conf/constant");
/**
 * 查询城市列表
 * @param {string} name 查询的城市名字
 */
exports.queryCityList = async (name) => {
    let params = {};
    if (name) {
        let reg = new RegExp(name, 'i');
        params.name = { $regex: reg };
    }
    try {
        return await index_1.CityModel.find(params);
    }
    catch (e) {
        return null;
    }
};
/**
 *  模糊查询当前输入的地址在当前城市的列表
 * @param {object} params 地图需要的参数
 */
exports.querySearchAddressList = async (params) => {
    // console.log(params)
    let url = 'https://apis.map.qq.com/ws/place/v1/search';
    let query = {};
    query.boundary = `region(${params.region},0)`;
    query.output = 'json';
    query.orderby = '_distance';
    query.page_size = '20';
    query.page_index = '1';
    query.key = constant_1.QQ_MAP_KEY;
    query.keyword = params.query;
    try {
        let { data } = await axios_1.default.get(url, {
            headers: {
                host: 'apis.map.qq.com'
            },
            params: query
        });
        // console.log(data)
        // console.log(data)
        if (data.status === 0) {
            return data.data || [];
        }
        else {
            return [];
        }
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
/**
 * 距离测量
 * @param {string} from 起点 23.123123,113.12435
 * @param {string} to 终点 23.123123,113.12435
*/
exports.queryDistance = async (from, to) => {
    let url = 'https://apis.map.qq.com/ws/distance/v1/';
    let query = {};
    query.mode = 'driving';
    query.from = from;
    query.to = to;
    query.key = constant_1.QQ_MAP_KEY;
    try {
        let { data } = await axios_1.default.get(url, {
            headers: {
                host: 'apis.map.qq.com'
            },
            params: query
        });
        const positionArr = [];
        let timevalue;
        data.result.elements.forEach((item) => {
            timevalue = parseInt(item.duration) + 1200;
            let durationtime = Math.ceil(timevalue % 3600 / 60) + '分钟';
            if (Math.floor(timevalue / 3600)) {
                durationtime = Math.floor(timevalue / 3600) + '小时' + durationtime;
            }
            positionArr.push({
                distance: item.distance,
                order_lead_time: durationtime,
            });
        });
        return positionArr || [];
    }
    catch (e) {
        return null;
    }
};
/**
 * 地点详情
 *  @param {string} uid // 搜索返回列表里带回的uid
*/
exports.queryAddrDetail = async (geohash) => {
    let url = 'https://apis.map.qq.com/ws/geocoder/v1/';
    let query = {};
    query.location = geohash;
    query.get_poi = '1';
    query.key = constant_1.QQ_MAP_KEY;
    try {
        let { data } = await axios_1.default.get(url, {
            headers: {
                host: 'apis.map.qq.com'
            },
            params: query
        });
        // console.log(data)
        return data.result;
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=city.js.map