/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { UserModel } from '../../db/model/index'

/**
 * 查询用户是否注册
 * @param {string} username 用户名
 * @param {string} password 密码 
 */
export const info = async (username: string, password?: string) => {
  let params = {
    username
  }
  if (password) {
    Object.assign(params, { password })
  }
  try {
    return await UserModel.findOne(params,  { password: 0});
  } catch (error) {
    return null;
  }
}
/**
 * 根据手机号码查询用户
 * @param {string} phone 手机号码
 */
export const phone = async (phone: string) => {
  let params = {
    phone
  }
  try {
    return await UserModel.findOne(params, { password: 0});
  } catch (error) {
    return null;
  }
}
/**
 * 创建用户
 * @param {string} username 用户名
 */
export const create = async (params: any) => {
  try {
    return await UserModel.create(params);
  } catch (error) {
    return null;
  }
}
/**
 * 修改用户资料
 * @param {object} params 要修改的数据
 */
export const update = async (params: any) => {
  try {
    return await UserModel.findOneAndUpdate({_id: params._id}, params);
  } catch (error) {
    return null;
  }
}
/**
 * 根据_id获取用户信息
 * @param {object} _id _id
 */
export const idinfo = async (_id: string) => {
  try {
    return await UserModel.findOne({ _id }, { password: 0});
  } catch (error) {
    return null;
  }
}
/**
 * 注销用户
 * @param {object} params 要修改的数据
 */
export const remove = async (_id: string) => {
  try {
    return await UserModel.deleteOne({_id});
  } catch (error) {
    return null;
  }
}