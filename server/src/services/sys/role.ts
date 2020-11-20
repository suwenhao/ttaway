/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { RoleModel } from '../../db/model/index'

/**
 * 添加
 * @param {string} role_name 角色名字
 */
export const add = async (role_name: string) => {
  try {
    return await RoleModel.create({ name: role_name});
  } catch (e) {
    return null;
  }
}

/**
 * 更新
 * @param {string} id 角色id
 * @param {object} params 修改角色的内容
 */
export const update = async (_id: string, params: any={}) => {
  try {
    return await RoleModel.findOneAndUpdate({ _id }, params);
  } catch (e) {
    return null;
  }
}
/**
 * 删除角色
 * @param {string} _id 角色id
 */
export const remove = async (_id: string) => {
  try {
    return await RoleModel.deleteOne({ _id });
  } catch (e) {
    return null;
  }
}

/**
 * 查询角色
 * @param {string} _id 角色_id
 */
export const queryRole = async (_id: string) => {
  let params: {_id?: any} = {}
  if (_id) {
    params._id = _id
  }
  try {
    return _id ? await RoleModel.findOne(params) : await RoleModel.find(params)
  } catch (e) {
    return null;
  }
}