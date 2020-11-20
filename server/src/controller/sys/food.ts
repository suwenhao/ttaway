/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { add, update, remove, list, queryFood } from '../../services/sys/food'
import { queryShop } from '../../services/sys/shop'
import { addMany, queryMoreIdSpec, removeMany } from '../../services/sys/spec'
import { queryCate } from '../../services/sys/foodcate'
// @ts-ignore
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import {
  addFoodFailInfo,
  foodListFailInfo,
  editFoodFailInfo,
  removeFoodFailInfo,
  queryFoodInfoFailInfo
} from '../../model/ErrorInfo'
import { formatSpecs } from '../../utils/format'
import * as Mongoose from 'mongoose'

/**
 *  添加食品
 * @param {object} params 食品对象
 */
export const Addfood = async (params: any) => {
  let {
    shop_id,
    foodcate_id,
    name,
    description,
    activity,
    image_path,
    attributes,
    discount,
    price,
    packing_fee,
  } = params
  let data: any = {
    shop_id,
    foodcate_id,
    name,
    description,
    image_path,
    activity,
    discount,
    attributes,
    price,
    packing_fee,
  }
  const result = await add(data)
  if (result) {
    try {
      let newSpecs = formatSpecs(params, result._id)
      let specsRes: any = await addMany(newSpecs)
      // console.log(specsRes)
      let specifications = specsRes.map((item: any) => {
        return item._id
      })
      let updateRes = await update(result._id, {
        specifications
      })
      return new SuccessModel(updateRes)
    } catch (error) {
      return new ErrorModel(addFoodFailInfo)
    }
  } else {
    return new ErrorModel(addFoodFailInfo)
  }
};
/**
 *  修改食品
 * @param {object} params 食品对象
 */
export const Editfood = async (params: any) => {
  let {
    foodcate_id,
    name,
    description,
    image_path,
    activity,
    discount,
    attributes,
    price,
    packing_fee,
  } = params
  let data: any = {
    foodcate_id,
    name,
    description,
    image_path,
    activity,
    discount,
    attributes,
    price,
    packing_fee,
  }
  const result = await update({_id: params._id}, data)
  if (result) {
    // 删除当前食品下的所有规格
    let res = await removeMany(params._id)
    console.log(params._id, res)
    if (res) {
      // 新建规格
      let newSpecs = formatSpecs(params, result._id)
      let specsRes: any = await addMany(newSpecs)
      // console.log(specsRes)
      let specifications = specsRes.map((item: any) => {
        return item._id
      })
      await update(result._id, {
        specifications
      })
      return new SuccessModel(result)
    } else {
      return new ErrorModel(editFoodFailInfo)
    }
  } else {
    return new ErrorModel(editFoodFailInfo)
  }
};
/**
 *  删除食品
 * @param {string} _id 食品id
 */
export const Deletefood = async (_id: string) => {
  // 删除当前食品下的所有规格
  let res = await removeMany(_id)
  const result = await remove(_id)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(removeFoodFailInfo)
  }
};
/**
 *  获取食品列表
 * @param {object} query
 */
export const getFoodList = async (query: any) => {
  const result: any = await list(query)
  if (result) {
    for (let i = 0; i < result.data.length; i++) {
      try {
        let shopRes = await queryShop(result.data[i].shop_id)
        // console.log(result.data[i].shop_id, shopRes)
        result.data[i]._doc.shopInfo = shopRes
      } catch (error) {
        result.data[i]._doc.shopInfo = null
      }
      try {
        let foodCateRes = await queryCate(result.data[i].foodcate_id)
        result.data[i]._doc.cateInfo = foodCateRes
      } catch (error) {
        result.data[i]._doc.cateInfo = null
      }
    }
    return new SuccessModel({
      offset: query.offset * 1 + 1,
      limit: query.limit * 1,
      total: result.count,
      data: result.data
    })
  } else {
    return new ErrorModel(foodListFailInfo)
  }
};
/**
 *  获取食品详情
 * @param {object} query
 */
export const getFoodInfo = async (query: any) => {
  try {
    let { _id } = query
    let result: any = await queryFood({_id});
    if (result) {
      console.log(result)
      let specifications = result.specifications
      let specs = await queryMoreIdSpec(specifications)
      result._doc.specs = specs
      return new SuccessModel(result)
    }
    else {
      return new ErrorModel(queryFoodInfoFailInfo)
    }
  } catch (error) {
    console.log(error)
  }
}