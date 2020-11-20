/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { queryTraitList } from '../../services/api/trait'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import { queryTraitListFailInfo } from '../../model/ErrorInfo'

/**
 *  获取餐馆特点列表
 * @param {string} _id 查询的城市名字
 */
export const getTraitList = async (_id: string) => {
  const traitlist = await queryTraitList(_id)
  if (traitlist) {
    return new SuccessModel(traitlist)
  } else {
    return new ErrorModel(queryTraitListFailInfo)
  }
};