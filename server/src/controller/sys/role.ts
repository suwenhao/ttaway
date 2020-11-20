/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { add, remove, queryRole, update } from '../../services/sys/role'
import { update as manageUpdate, getRoleIdManage } from '../../services/sys/manage'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import {
  addRoleFailInfo,
  addEditRoleNotNameFailInfo,
  addEditRoleNotIDFailInfo,
  queryRoleListFailInfo,
  setPermissionFailInfo,
  removeRoleFailInfo,
  editRoleFailInfo
 } from '../../model/ErrorInfo'
import * as Mongoose from 'mongoose'

/**
 *  添加角色
 * @param {string} role_name 角色名字
 */
export const Addrole = async (role_name: string) => {
  const roleRes = await add(role_name)
  if (!role_name) {
    return new ErrorModel(addEditRoleNotNameFailInfo)
  }
  if (roleRes) {
    return new SuccessModel(roleRes)
  } else {
    return new ErrorModel(addRoleFailInfo)
  }
};
/**
 *  修改角色
 * @param {string} _id 角色_id
 * @param {string} role_name 角色名字
 */
export const Editrole = async (_id: string, role_name: string) => {
  const roleRes = await update(_id, {name: role_name})
  if (!_id) {
    return new ErrorModel(addEditRoleNotIDFailInfo)
  }
  if (!role_name) {
    return new ErrorModel(addEditRoleNotNameFailInfo)
  }
  if (roleRes) {
    return new SuccessModel(roleRes)
  } else {
    return new ErrorModel(editRoleFailInfo)
  }
};
/**
 *  删除角色
 * @param {string} role_name 角色_id
 */
export const Deleterole = async (_id: string) => {
  let id = Mongoose.Types.ObjectId(_id);
  const manageList  = await getRoleIdManage(id)
  // console.log(manageList)
  if (!_id) {
    return new ErrorModel(addEditRoleNotIDFailInfo)
  }
  // 所有设置了角色的用户清除角色
  if (manageList) {
    manageList.forEach(async (item: any) => {
      let params: any = {
        _id: item._id,
        role_id: null
      }
      try {
        await manageUpdate(params)
      } catch (error) {}
    })
  }
  // const roleRes = {}
  const roleRes = await remove(_id)
  if (roleRes) {
    return new SuccessModel(roleRes)
  } else {
    return new ErrorModel(removeRoleFailInfo)
  }
};

/**
 *  获取角色列表
 * @param {string} _id 角色_id
 */
export const getRoleList = async (_id: string) => {
  const roleRes = await queryRole(_id)
  if (roleRes) {
    return new SuccessModel(roleRes)
  } else {
    return new ErrorModel(queryRoleListFailInfo)
  }
};

/**
 *  设置权限
 * @param {object} id 角色
 */
export const setPermission = async (ctx: any, body: any) => {
  let {
    menus,
    auth_time,
    auth_name,
    _id,
  } = body
  const params = {
    menus,
    auth_time,
    auth_name: auth_name ? auth_name : ctx.manage.username
  }
  if (!_id) {
    return new ErrorModel(addEditRoleNotIDFailInfo)
  }
  const roleRes = await update(_id, params)
  if (roleRes) {
    return new SuccessModel(roleRes)
  } else {
    return new ErrorModel(setPermissionFailInfo)
  }
};