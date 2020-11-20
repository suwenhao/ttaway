/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { FoodModel } from '../../db/model/index'
import * as Mongoose from 'mongoose'

/**
 * 添加
 * @param {object} params
 */
export const add = async (params: any) => {
  try {
    return await FoodModel.create(params)
  } catch (e) {
    return null
  }
}

/**
 * 修改
 * @param {string} _id
 * @param {object} params
 */
export const update = async (_id: any, params: any) => {
  try {
    return await FoodModel.findOneAndUpdate({ _id }, params);
  } catch (e) {
    return null
  }
}
/**
 * 删除某餐馆下的食品
 * @param {array} shop_id 餐馆id
 */
export const removeMore = async (shop_id: any) => {
  shop_id = Mongoose.Types.ObjectId(shop_id)
  try {
    return await FoodModel.deleteMany({ shop_id });
  } catch (e) {
    return null;
  }
}
/**
 * 删除食品
 * @param {array} _id 食品id
 */
export const remove = async (_id: any) => {
  _id = Mongoose.Types.ObjectId(_id)
  try {
    return await FoodModel.deleteMany({ _id });
  } catch (e) {
    return null;
  }
}
/**
 * 获取食品列表
 * @param {object} params 分页数据
 */
export const list = async (params: any) => {
  params.offset = params.offset - 1
  let query = {}
  let skip = params.limit * params.offset
  try {
    let data = await FoodModel.find(query).limit(params.limit * 1).skip(skip).sort({create_time: -1})
    let count = await FoodModel.countDocuments(query)
    return {
      data,
      count
    }
  } catch (e) {
    return null;
  }
}
/**
 * 根据餐馆获取列表
 * @param {string} shop_id 餐馆id
 */
export const shopQueryFood = async (shop_id?: string) => {
  let params: any = {}
  if (shop_id) {
    params.shop_id =  shop_id
  }
  try {
    return await FoodModel.find(params)
  } catch (e) {
    return null;
  }
}
/**
 * 根据ID获取详情
 * @param {string} _id 食品id
 */
export const queryFood = async (_id?: any) => {
  let params: any = {
    _id
  }
  try {
    return await FoodModel.findOne(params)
  } catch (e) {
    return null;
  }
}
