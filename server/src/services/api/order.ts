/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { OrderModel } from '../../db/model/index'

/**
 * 保存订单信息
 * @param {object} params 订单数据
 */
export const save = async (params?: any) => {
  try {
    return await OrderModel.create(params);
  } catch (e) {
    return null;
  }
}
/**
 * 获取用户订单列表
 * @param {object} userId 用户id
 */
export const list = async (userId?: any) => {
  let params: any = {}
  if (userId) {
    params.userId = userId
  }
  try {
    return await OrderModel.find(params);
  } catch (e) {
    return null;
  }
}
