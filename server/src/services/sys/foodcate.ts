/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { FoodCateModel } from '../../db/model/index'

/**
 * 添加
 * @param {object} params
 */
export const add = async (params: any) => {
  try {
    return await FoodCateModel.create(params)
  } catch (e) {
    return null
  }
}

/**
 * 获取列表
 * @param {string} shop_id 餐馆id
 */
export const list = async (shop_id: string) => {
  try {
    return await FoodCateModel.find({ shop_id: { $in: ['0', shop_id] } })
  } catch (e) {
    return null;
  }
}

/**
 * 根据id获取
 * @param {string} _id 餐馆id
 */
export const queryCate = async (_id: string) => {
  try {
    return await FoodCateModel.findOne({ _id })
  } catch (e) {
    return null;
  }
}
