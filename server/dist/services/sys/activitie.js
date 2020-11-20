"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMoreIdActivitie = exports.queryActivitie = exports.removeMore = exports.remove = exports.add = void 0;
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
 * 添加
 * @param {object} params 活动数据
 */
exports.add = async (params) => {
    try {
        return await index_1.ActivitieModel.create(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除
 * @param {string} _id 活动id
 */
exports.remove = async (_id) => {
    try {
        return await index_1.ActivitieModel.deleteOne({ _id });
    }
    catch (e) {
        return null;
    }
};
/**
 * 删除多个
 * @param {array} _id 活动id数组
 */
exports.removeMore = async (idArr) => {
    try {
        return await index_1.ActivitieModel.remove({ _id: { $in: idArr } });
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询活动
 * @param {string} _id 活动_id
 */
exports.queryActivitie = async (_id) => {
    let params = {};
    if (_id) {
        params._id = _id;
    }
    try {
        return _id ? await index_1.ActivitieModel.findOne(params) : await index_1.ActivitieModel.find(params);
    }
    catch (e) {
        return null;
    }
};
/**
 * 查询多个活动
 * @param {array}} _id[] 活动_id数组
 */
exports.queryMoreIdActivitie = async (idArr) => {
    try {
        return await index_1.ActivitieModel.find({ _id: { $in: idArr } });
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=activitie.js.map