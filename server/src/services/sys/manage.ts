/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { ManageModel } from '../../db/model/index'
import { IManageRes } from '../../types/manage';

/**
 * 获取管理员信息
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
    return await ManageModel.findOne(params);
  } catch (error) {
    return null;
  }
}
/**
 * 根据role_id获取管理员列表
 * @param {string} role_id role_id 
 */
export const getRoleIdManage = async (role_id: any) => {
  try {
    return await ManageModel.find({role_id});
  } catch (error) {
    return null;
  }
}
/**
 * 创建管理员
 * @param {string} username 用户名
 * @param {string} password 密码 
 */
export const create = async (params: IManageRes) => {
  try {
    return await ManageModel.create(params);
  } catch (error) {
    return null;
  }
}
/**
 * 修改管理员
 * @param {object} params 要修改的数据
 */
export const update = async (params: IManageRes) => {
  try {
    return await ManageModel.findOneAndUpdate({_id: params._id}, params);
  } catch (error) {
    return null;
  }
}
/**
 * 根据_id获取管理员
 * @param {object} _id _id
 */
export const idinfo = async (_id: string) => {
  try {
    return await ManageModel.findOne({ _id }, { password: 0});
  } catch (error) {
    return null;
  }
}
/**
 * 删除管理员
 * @param {object} params 要修改的数据
 */
export const remove = async (_id: string) => {
  try {
    return await ManageModel.deleteOne({_id});
  } catch (error) {
    return null;
  }
}
/**
 * 获取管理员列表
 */
export const list = async () => {
  try {
    let res = await ManageModel.aggregate([
      {
        $lookup: {
          from:'roles',
          localField:'role_id',
          foreignField:'_id',
          as:'role'
        }
      },
      {
        $project:{password:0}
      }
    ]);
    return res
  } catch (error) {
    return null;
  }
}