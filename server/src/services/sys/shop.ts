/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { ShopModel } from '../../db/model/index'
import * as Mongoose from 'mongoose'
/**
 * 添加
 * @param {object} params 餐馆资料
 */
export const add = async (params: any) => {
  try {
    return await ShopModel.create(params);
  } catch (e) {
    return null;
  }
}

/**
 * 更新
 * @param {string} id 角色id
 * @param {object} params 修改餐馆的内容
 */
export const update = async (_id: string, params: any = {}) => {
  try {
    return await ShopModel.findOneAndUpdate({ _id }, params);
  } catch (e) {
    return null;
  }
}
/**
 * 删除
 * @param {string} _id 餐馆_id
 */
export const remove = async (_id: string) => {
  try {
    return await ShopModel.deleteOne({ _id });
  } catch (e) {
    return null;
  }
}

/**
 * 查询餐馆
 * @param {string} params 餐馆分页数据
 */
export const list = async (params: any) => {
  if (!params) {
    return await ShopModel.find();
  }
  params.offset = params.offset - 1
  let query = {}
  if (params.query) {
    query = params.query
  }
  let sort = { create_time: -1 }
  if (params.sort) {
    sort = params.sort
  }
  params.limit = params.limit * 1
  // console.log(params)
  let skip = params.limit * params.offset
  try {
    let data = await ShopModel.find(query).limit(params.limit).skip(skip).sort(sort)
    let count = await ShopModel.countDocuments(query)
    return {
      data,
      count
    }
  } catch (e) {
    console.log(e)
    return null;
  }
}
/**
 * 根据id查询餐馆
 * @param {string} _id 餐馆_id
 */
export const queryShop = async (_id: string) => {
  let params = {
    _id
  }
  try {
    return await ShopModel.findOne(params)
  } catch (e) {
    return null;
  }
}