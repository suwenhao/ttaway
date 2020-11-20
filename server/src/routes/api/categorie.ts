/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getCategorieList } from '../../controller/api/categorie'
const router = new Router();

router.prefix('/api/categorie');

// 获取分类列表
router.get('/list', async (ctx: any) => {
  let { parent_id } = ctx.request.query;
  ctx.body = await getCategorieList(parent_id);
});

export default router