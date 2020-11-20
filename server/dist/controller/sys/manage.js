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
exports.getNewManage = exports.getManageList = exports.deleteManage = exports.addAndUpdate = void 0;
const manage_1 = require("../../services/sys/manage");
const role_1 = require("../../services/sys/role");
const ResModel_1 = require("../../model/ResModel");
const cryp_1 = require("../../utils/cryp");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 * 添加管理员
 * @param {string} username 管理员
 * @param {string} password 密码
 */
exports.addAndUpdate = async (params) => {
    const manageInfo = await manage_1.info(params.username);
    if (params._id) {
        let data = {};
        if (!params.username) {
            return new ResModel_1.ErrorModel(ErrorInfo_1.manageNotNameFailInfo);
        }
        data._id = params._id;
        data.username = params.username;
        if (params.email)
            data.email = params.email;
        if (params.phone)
            data.phone = params.phone;
        if (params.role_id)
            data.role_id = params.role_id;
        try {
            let res = await manage_1.update(data);
            return new ResModel_1.SuccessModel();
        }
        catch (ex) {
            return new ResModel_1.ErrorModel(ErrorInfo_1.editManageFailInfo);
        }
    }
    else {
        if (manageInfo) {
            // 管理员已存在
            return new ResModel_1.ErrorModel(ErrorInfo_1.addManageNameExistInfo);
        }
        else {
            let data = {};
            if (!params.username) {
                return new ResModel_1.ErrorModel(ErrorInfo_1.manageNotNameFailInfo);
            }
            if (!params.password) {
                return new ResModel_1.ErrorModel(ErrorInfo_1.manageNotPwsFailInfo);
            }
            data.username = params.username;
            data.password = cryp_1.doCrypto(params.password);
            if (params.email)
                data.email = params.email;
            if (params.phone)
                data.phone = params.phone;
            if (params.role_id)
                data.role_id = params.role_id;
            try {
                let res = await manage_1.create(data);
                return new ResModel_1.SuccessModel(res);
            }
            catch (ex) {
                return new ResModel_1.ErrorModel(ErrorInfo_1.addManageFailInfo);
            }
        }
    }
};
/**
 * 删除管理员
 * @param {string} _id 管理员_id
 */
exports.deleteManage = async (_id) => {
    try {
        let manageRes = await manage_1.remove(_id);
        return new ResModel_1.SuccessModel(manageRes);
    }
    catch (ex) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.getManageListFailInfo);
    }
};
/**
 * 获取管理员列表
 * @param {string} username 管理员
 * @param {string} password 密码
 */
exports.getManageList = async () => {
    try {
        let manageRes = await manage_1.list();
        return new ResModel_1.SuccessModel(manageRes);
    }
    catch (ex) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.getManageListFailInfo);
    }
};
/**
 * 获取管理员更新信息后的菜单
 * @param {string} _id _id
 */
exports.getNewManage = async (_id) => {
    try {
        let manageRes = await manage_1.idinfo(_id);
        if (manageRes) {
            let menus = [];
            if (manageRes.role_id) {
                const roleRes = await role_1.queryRole(manageRes.role_id);
                if (roleRes) {
                    menus = roleRes.menus;
                }
            }
            else {
                if (manageRes.username !== 'admin') {
                    menus = ['/home'];
                }
            }
            let data = {
                username: manageRes.username,
                _id: manageRes._id,
                root: manageRes.root,
                role_id: manageRes.role_id ? manageRes.role_id : '',
                email: manageRes.email ? manageRes.email : '',
                menus,
                phone: manageRes.phone ? manageRes.phone : ''
            };
            return new ResModel_1.SuccessModel(data);
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.manageUpdateInfoFailInfo);
        }
    }
    catch (ex) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.manageUpdateInfoFailInfo);
    }
};
//# sourceMappingURL=manage.js.map