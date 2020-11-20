/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import {
  add,
  remove,
  queryShop,
  list,
  update
} from '../../services/sys/shop'
import {
  removeMore as foodRemove,
  shopQueryFood
} from '../../services/sys/food'
import {
  removeMore,
  add as addActivitie,
  queryMoreIdActivitie
} from '../../services/sys/activitie'
import {
  removeMany as specRemove
} from '../../services/sys/spec'
import { queryMoreIdCategorie } from '../../services/api/categorie'
import { queryMoreValTrait } from '../../services/api/trait'
import {
  list as queryFoodCateList,
  add as addFoodCate
} from '../../services/sys/foodcate'
import  {
  addShopFailInfo,
  removeShopFailInfo,
  editShopFailInfo,
  shopListFailInfo,
  shopNotIDFailInfo,
  shopInfoFailInfo,
  foodCateListFailInfo,
  addFoodCateFailInfo
} from '../../model/ErrorInfo'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import * as Mongoose from 'mongoose'

/**
 *  添加餐馆
 * @param {object} params 餐馆数据
 */
export const AddShop = async (params: any) => {
  let activitieArr = params.activitie_data
  params.aid_list = []
  for (let i = 0; i < activitieArr.length; i++) {
    let aRes = await addActivitie(activitieArr[i])
    params.aid_list.push(aRes._id)
  }
  const result = await add(params)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(addShopFailInfo)
  }
};
/**
 *  修改餐馆
 * @param {object} params 餐馆数据
 */
export const UpdateShop = async (params: any) => {
  if (!params._id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  const shopRes: any = await queryShop(params._id)
  if (shopRes) {
    // 删除所有当前餐馆的活动
    try {
      await removeMore(shopRes.aid_list)
    } catch (error) { }
  }
  // 新增修改带回的活动，保存这些活动的_id
  let activitieArr = params.activitie_data
  params.aid_list = []
  for (let i = 0; i < activitieArr.length; i++) {
    let aRes = await addActivitie(activitieArr[i])
    params.aid_list.push(aRes._id)
  }
  const result = await update(params._id, params)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(editShopFailInfo)
  }
};
/**
 *  修改餐馆信息
 * @param {object} query 餐馆信息数据
 */
export const UpdateInfoShop = async (query: any) => {
  if (!query._id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  const result = await update(query._id, query.params)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(editShopFailInfo)
  }
};
/**
 *  删除餐馆
 * @param {string} role_name 餐馆_id
 */
export const DeleteShop = async (_id: string) => {
  if (!_id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  try {
    const shopRes: any = await queryShop(_id)
    if (shopRes) {
      try {
        // 删除所有当前餐馆的活动
        await removeMore(shopRes.aid_list)
        let foodList = await shopQueryFood(_id)
        for (let i=0;i<foodList.length;i++) {
          // 删除食品下所有规格
          await specRemove(foodList[i]._id)
           // 删除所有食品
          await foodRemove(foodList[i]._id)
        }
      } catch (error) { }
    }
    const removeInfo = await remove(_id)
    if (removeInfo) {
      return new SuccessModel(removeInfo)
    } else {
      return new ErrorModel(removeShopFailInfo)
    }
  } catch (error) {
    return new ErrorModel(removeShopFailInfo)
  }
};

/**
 *  获取餐馆列表
 * @param {object} query 餐馆请求数据
 */
export const getShopList = async (query: any) => {
  try {
    let params: any = {
      offset: query.offset,
      limit: query.limit,
    }
    if (query.search) {
      let reg = new RegExp(query.search, 'i')
      params.query = {
        name: { $regex: reg }
      }
    }
    const result: any = await list(params)
    if (result) {
      try {
        for (let i = 0; i < result.data.length; i++) {
          let activitie_data = await queryMoreIdActivitie(result.data[i].aid_list)
          result.data[i]._doc.activitie_data = activitie_data
          let category_data = await queryMoreIdCategorie(result.data[i].category)
          result.data[i]._doc.category_data = category_data
          let trait_data = await queryMoreValTrait(result.data[i].trait)
          result.data[i]._doc.trait_data = trait_data
        }
        return new SuccessModel({
          offset: query.offset * 1 + 1,
          limit: query.limit * 1,
          total: result.count,
          data: result.data
        })
      } catch (error) {
        return new ErrorModel(shopListFailInfo)
      }
    } else {
      return new ErrorModel(shopListFailInfo)
    }
  } catch (error) {
    return new ErrorModel(shopListFailInfo)
  }
};
/**
 *  获取所有餐馆列表
 */
export const shopList = async () => {
  const result: any = await list(null)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(shopListFailInfo)
  }
};
/**
 *  获取餐馆详细信息
 * @param {string} _id 餐馆_id
 */
export const getShopInfo = async (_id: string) => {
  if (!_id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  let result = await queryShop(_id)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(shopInfoFailInfo)
  }
}

/**
 * 获取餐馆食品分类
 * @param {string} shop_id 餐馆id
 */
export const getShopCateList = async (shop_id: any) => {
  if (!shop_id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  try {
    const result: any = await queryFoodCateList(shop_id)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel(foodCateListFailInfo)
    }
  } catch (error) {
    return new ErrorModel(foodCateListFailInfo)
  }
}
/**
 * 添加餐馆食品分类
 * @param {object} params 餐馆id 
 */
export const AddShopCate = async (params: any) => {
  if (!params.shop_id) {
    return new ErrorModel(shopNotIDFailInfo)
  }
  try {
    let result: any = await addFoodCate(params)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel(addFoodCateFailInfo)
    }
  } catch (error) {
    return new ErrorModel(addFoodCateFailInfo)
  }
}