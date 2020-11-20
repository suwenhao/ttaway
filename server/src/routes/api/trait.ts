/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getTraitList } from '../../controller/api/trait'
const router = new Router();

router.prefix('/api/trait');

// 获取分类列表
router.get('/list', async (ctx: any) => {
  let { _id } = ctx.request.query;
  ctx.body = await getTraitList(_id);
});

export default router