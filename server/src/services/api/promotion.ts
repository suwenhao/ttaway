/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { PromotionModel } from '../../db/model/index'

/**
 * 查询优惠活动列表
 * @param {number} _id 查询_id
 */
export const queryPromotionList = async (_id?: string) => {
  let params: { _id?: string } = {}
  if (_id) {
    params._id = _id
  }
  try {
    return await PromotionModel.find(params).sort({ 'id': 1 });
  } catch (e) {
    return null;
  }
}