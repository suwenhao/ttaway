/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { MyaddressModel, AreaModel } from '../../db/model/index'

/**
 * 查询当前用户所有地址
 * @param {string} _id 用户id
 */
export const list = async (userId: string) => {
  let params = {
    userId
  }
  try {
    return await MyaddressModel.find(params);
  } catch (error) {
    return null;
  }
}
/**
 * 创建用户地址
 * @param {object} params 要添加的数据
 */
export const create = async (params: any) => {
  try {
    return await MyaddressModel.create(params);
  } catch (error) {
    console.log(error)
    return null;
  }
}
/**
 * 修改用户地址
 * @param {object} params 要修改的数据
 */
export const update = async (params: any) => {
  let data = Object.assign({}, params)
  delete data._id
  delete data.userId
  if (data.isDefault) {
    let res = await MyaddressModel.updateMany({userId: params.userId}, {$set: {isDefault: false}})
    // console.log(res)
  }
  try {
    return await MyaddressModel.findOneAndUpdate({_id: params._id}, data);
  } catch (error) {
    return null;
  }
}
/**
 * 删除用户地址
 * @param {object} params 要修改的数据
 */
export const remove = async (_id: string) => {
  try {
    return await MyaddressModel.deleteOne({_id});
  } catch (error) {
    return null;
  }
}

/**
 * 查询当前省市区列表
 */
export const arealist = async () => {
  let params = {}
  try {
    return await AreaModel.find(params);
  } catch (error) {
    return null;
  }
}