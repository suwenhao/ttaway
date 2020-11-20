/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { queryPromotionList } from '../../services/api/promotion'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import { queryPromotionListFailInfo } from '../../model/ErrorInfo'

/**
 *  获取优惠活动列表
 * @param {string} _id 查询优惠活动名字
 */
export const getPromotionList = async (_id: string) => {
  const promotionlist = await queryPromotionList(_id)
  if (promotionlist) {
    return new SuccessModel(promotionlist)
  } else {
    return new ErrorModel(queryPromotionListFailInfo)
  }
};