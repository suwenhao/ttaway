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
exports.setPermission = exports.getRoleList = exports.Deleterole = exports.Editrole = exports.Addrole = void 0;
const role_1 = require("../../services/sys/role");
const manage_1 = require("../../services/sys/manage");
const ResModel_1 = require("../../model/ResModel");
const ErrorInfo_1 = require("../../model/ErrorInfo");
const Mongoose = require("mongoose");
/**
 *  添加角色
 * @param {string} role_name 角色名字
 */
exports.Addrole = async (role_name) => {
    const roleRes = await role_1.add(role_name);
    if (!role_name) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addEditRoleNotNameFailInfo);
    }
    if (roleRes) {
        return new ResModel_1.SuccessModel(roleRes);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addRoleFailInfo);
    }
};
/**
 *  修改角色
 * @param {string} _id 角色_id
 * @param {string} role_name 角色名字
 */
exports.Editrole = async (_id, role_name) => {
    const roleRes = await role_1.update(_id, { name: role_name });
    if (!_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addEditRoleNotIDFailInfo);
    }
    if (!role_name) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addEditRoleNotNameFailInfo);
    }
    if (roleRes) {
        return new ResModel_1.SuccessModel(roleRes);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.editRoleFailInfo);
    }
};
/**
 *  删除角色
 * @param {string} role_name 角色_id
 */
exports.Deleterole = async (_id) => {
    let id = Mongoose.Types.ObjectId(_id);
    const manageList = await manage_1.getRoleIdManage(id);
    // console.log(manageList)
    if (!_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addEditRoleNotIDFailInfo);
    }
    // 所有设置了角色的用户清除角色
    if (manageList) {
        manageList.forEach(async (item) => {
            let params = {
                _id: item._id,
                role_id: null
            };
            try {
                await manage_1.update(params);
            }
            catch (error) { }
        });
    }
    // const roleRes = {}
    const roleRes = await role_1.remove(_id);
    if (roleRes) {
        return new ResModel_1.SuccessModel(roleRes);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.removeRoleFailInfo);
    }
};
/**
 *  获取角色列表
 * @param {string} _id 角色_id
 */
exports.getRoleList = async (_id) => {
    const roleRes = await role_1.queryRole(_id);
    if (roleRes) {
        return new ResModel_1.SuccessModel(roleRes);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryRoleListFailInfo);
    }
};
/**
 *  设置权限
 * @param {object} id 角色
 */
exports.setPermission = async (ctx, body) => {
    let { menus, auth_time, auth_name, _id, } = body;
    const params = {
        menus,
        auth_time,
        auth_name: auth_name ? auth_name : ctx.manage.username
    };
    if (!_id) {
        return new ResModel_1.ErrorModel(ErrorInfo_1.addEditRoleNotIDFailInfo);
    }
    const roleRes = await role_1.update(_id, params);
    if (roleRes) {
        return new ResModel_1.SuccessModel(roleRes);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.setPermissionFailInfo);
    }
};
//# sourceMappingURL=role.js.map