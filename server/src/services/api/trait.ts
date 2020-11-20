/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { TraitModel } from '../../db/model/index'

/**
 * 查询餐馆特点列表
 * @param {number} _id 查询_id
 */
export const queryTraitList = async (_id?: string) => {
  let params: { _id?: string } = {}
  if (_id) {
    params._id = _id
  }
  try {
    return await TraitModel.find(params).sort({ 'id': 1 });
  } catch (e) {
    return null;
  }
}

/**
 * 查询餐馆特点列表
 * @param {array} _id 查询_id数组
 */
export const queryMoreValTrait = async (valArr?: any) => {
  try {
    return await TraitModel.find({ val: { $in: valArr }}).sort({ '_id': 1 });
  } catch (e) {
    return null;
  }
}