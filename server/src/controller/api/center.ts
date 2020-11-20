/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { list, create, arealist, update, remove } from '../../services/api/center'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import {
  queryMyAddressFailInfo,
  queryAreaListFailInfo,
  addMyAreaFailInfo,
  editMyAreaFailInfo
} from '../../model/ErrorInfo'

/**
 * 获取用户地址列表
 * @param {string} userId 用户ID
 */
export const getAreaList = async({userId}: any) => {
  let result = await list(userId)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(queryMyAddressFailInfo)
  }
}
/**
 * 获取省市区列表
 */
export const getAreaData = async() => {
  let result = await arealist()
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(queryAreaListFailInfo)
  }
}
/**
 * 添加我的地址
 * @param {object} params
 */
export const addAddress = async(params: any) => {
  let result = await create(params)
  console.log(result)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(addMyAreaFailInfo)
  }
}
/**
 * 修改我的地址
 * @param {object} params
 */
export const editAddress = async(params: any) => {
  let result = await update(params)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(editMyAreaFailInfo)
  }
}
/**
 * 删除我的地址
 * @param {object} params
 */
export const deleteAddress = async(_id: any) => {
  let result = await remove(_id)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(editMyAreaFailInfo)
  }
}

