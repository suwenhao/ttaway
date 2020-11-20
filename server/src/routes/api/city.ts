/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getCityList, getSearchAddressList, getAddrDetail } from '../../controller/api/city'
const router = new Router();

router.prefix('/api/city');

// 获取城市列表
router.get('/list', async (ctx: any) => {
  let { name } = ctx.request.query;
  ctx.body = await getCityList(name ? name : null);
});
// 模糊查询当前输入的地址在当前城市的列表
router.get('/address_list', async (ctx: any) => {
  let query = ctx.request.query;
  ctx.body = await getSearchAddressList(query);
});
// 获取当前经纬度地址信息
router.get('/address_detail', async (ctx: any) => {
  let query = ctx.request.query;
  ctx.body = await getAddrDetail(query);
});

export default router