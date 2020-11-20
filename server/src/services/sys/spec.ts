/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { SpecModel } from '../../db/model/index'
import * as Mongoose from 'mongoose'

/**
 * 添加多条数据
 * @param {array} params
 */
export const addMany = async (params: any) => {
  try {
    return await SpecModel.insertMany(params)
  } catch (e) {
    console.log(e)
    return null
  }
}
/**
 * 查询多个规格
 * @param {array} _id[] 规格_id数组
 */
export const queryMoreIdSpec = async (idArr: any) => {
  try {
    return await SpecModel.find({ _id: { $in: idArr }})
  } catch (e) {
    return null;
  }
}
/**
 * 删除多同食品下的规格
 * @param {array} food_id  食品id
 */
export const removeMany = async (food_id: any) => {
  food_id = Mongoose.Types.ObjectId(food_id)
  try {
    return await SpecModel.deleteMany({ food_id });
  } catch (e) {
    console.log(e)
    return null
  }
}
