/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import {
  getRestaurantList,
  getShopInfo
} from '../../controller/api/shopping'
const router = new Router();

router.prefix('/api/shopping');

// 获取附近商家
router.get('/restaurants', async (ctx: any) => {
  let query = ctx.request.query;
  ctx.body = await getRestaurantList(query);
});
// 获取附近商家
router.get('/info', async (ctx: any) => {
  let query = ctx.request.query;
  ctx.body = await getShopInfo(query);
});
export default router