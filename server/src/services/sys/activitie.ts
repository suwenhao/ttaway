/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { ActivitieModel } from '../../db/model/index'

/**
 * 添加
 * @param {object} params 活动数据
 */
export const add = async (params: any) => {
  try {
    return await ActivitieModel.create(params);
  } catch (e) {
    return null;
  }
}

/**
 * 删除
 * @param {string} _id 活动id
 */
export const remove = async (_id: string) => {
  try {
    return await ActivitieModel.deleteOne({ _id });
  } catch (e) {
    return null;
  }
}

/**
 * 删除多个
 * @param {array} _id 活动id数组
 */
export const removeMore = async (idArr: any) => {
  try {
    return await ActivitieModel.remove({ _id: { $in: idArr } });
  } catch (e) {
    return null;
  }
}

/**
 * 查询活动
 * @param {string} _id 活动_id
 */
export const queryActivitie = async (_id: string) => {
  let params: { _id?: any } = {}
  if (_id) {
    params._id = _id
  }
  try {
    return _id ? await ActivitieModel.findOne(params) : await ActivitieModel.find(params)
  } catch (e) {
    return null;
  }
}
/**
 * 查询多个活动
 * @param {array}} _id[] 活动_id数组
 */
export const queryMoreIdActivitie = async (idArr: any) => {
  try {
    return await ActivitieModel.find({ _id: { $in: idArr }})
  } catch (e) {
    return null;
  }
}