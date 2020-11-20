/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getPromotionList } from '../../controller/api/promotion'
const router = new Router();

router.prefix('/api/promotion');

// 获取分类列表
router.get('/list', async (ctx: any) => {
  let { _id } = ctx.request.query;
  ctx.body = await getPromotionList(_id);
});

export default router