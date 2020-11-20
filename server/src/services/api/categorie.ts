/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import { CategorieModel } from '../../db/model/index'

/**
 * 查询分类列表
 * @param {number} id 查询id
 */
export const queryCategorieList = async (parent_id?: number) => {
  let params: { parent_id?: number } = {}
  if (parent_id) {
    params.parent_id = parent_id
  }
  try {
    return await CategorieModel.find(params).sort({'id': 1});
  } catch (e) {
    return null;
  }
}

/**
 * 查询多个分类返回列表
 * @param {number} id 查询id数组
 */
export const queryMoreIdCategorie = async (idArr: number) => {
  try {
    return await CategorieModel.find({id: {$in: idArr}}).sort({id: 1});
  } catch (e) {
    return null;
  }
}