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
  Addfood,
  Editfood,
  Deletefood,
  getFoodInfo,
  getFoodList
} from '../../controller/sys/food'
import { reqPermission } from '../../middleware/reqPermission'
const router = new Router();

router.prefix('/sys/food');

// 添加食品
router.post('/add', async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await Addfood(body);
});
// 修改食品
router.post('/update', reqPermission(), async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await Editfood(body);
});
// 删除食品
router.post('/delete', reqPermission(), async (ctx: any) => {
  const { _id } = ctx.request.body;
  ctx.body = await Deletefood(_id);
});
// 获取食品列表
router.get('/list', async (ctx: any) => {
  const query = ctx.request.query;
  ctx.body = await getFoodList(query);
});
// 获取食品详情
router.get('/info', async (ctx: any) => {
  const query = ctx.request.query;
  ctx.body = await getFoodInfo(query);
});

export default router