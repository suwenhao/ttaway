/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { queryCategorieList } from '../../services/api/categorie'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import { queryCategorieListFailInfo } from '../../model/ErrorInfo'

/**
 *  获取分类列表
 * @param {number} id 查询的城市名字
 */
export const getCategorieList = async (parent_id: number) => {
    const categorielist = await queryCategorieList(parent_id)
    if (categorielist) {
        return new SuccessModel(categorielist)
    } else {
        return new ErrorModel(queryCategorieListFailInfo)
    }
};