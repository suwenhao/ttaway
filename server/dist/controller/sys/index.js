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
exports.updateFile = exports.loginManage = exports.isExist = void 0;
const manage_1 = require("../../services/sys/manage");
const role_1 = require("../../services/sys/role");
const ResModel_1 = require("../../model/ResModel");
const jwt = require("jsonwebtoken");
const constant_1 = require("../../conf/constant");
const cryp_1 = require("../../utils/cryp");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 * 管理员账号是否存在
 * @param {string} username 管理员
 */
exports.isExist = async (username) => {
    const manageInfo = await manage_1.info(username);
    if (manageInfo) {
        return new ResModel_1.SuccessModel();
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addManageNotExistInfo);
    }
};
/**
 * 管理员登录
 * @param {string} username 管理员
 * @param {string} password 密码
 */
exports.loginManage = async ({ username, password }) => {
    const manageInfo = await manage_1.info(username, cryp_1.doCrypto(password));
    if (manageInfo) {
        let menus = [];
        if (manageInfo.role_id) {
            const roleRes = await role_1.queryRole(manageInfo.role_id);
            if (roleRes) {
                menus = roleRes.menus;
            }
        }
        else {
            if (!manageInfo.root) {
                menus = ['/home'];
            }
        }
        let data = jwt.sign({
            username: manageInfo.username,
            _id: manageInfo._id,
            root: manageInfo.root,
        }, constant_1.JWT_KEY, { expiresIn: 60 * 60 * 24 });
        return new ResModel_1.SuccessModel({
            token: data,
            username: manageInfo.username,
            _id: manageInfo._id,
            root: manageInfo.root,
            role_id: manageInfo.role_id ? manageInfo.role_id : '',
            email: manageInfo.email ? manageInfo.email : '',
            menus,
            phone: manageInfo.phone ? manageInfo.phone : ''
        });
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.manageNameOrManagePassFailInfo);
    }
};
// 上传文件
exports.updateFile = async (filename) => {
    try {
        return new ResModel_1.SuccessModel({
            name: filename,
            url: 'http://localhost:3001/upload/' + filename
        });
    }
    catch (ex) {
        // console.log(ex)
        return new ResModel_1.ErrorModel(ErrorInfo_1.updateFileFailInfo);
    }
};
//# sourceMappingURL=index.js.map