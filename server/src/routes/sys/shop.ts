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
  AddShop,
  getShopList,
  shopList,
  getShopInfo,
  DeleteShop,
  UpdateShop,
  UpdateInfoShop,
  getShopCateList,
  AddShopCate
} from '../../controller/sys/shop'
import { reqPermission } from '../../middleware/reqPermission'
const router = new Router();

router.prefix('/sys/shop');

// 添加餐馆
router.post('/add', async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await AddShop(body);
});
// 修改餐馆
router.post('/update', async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await UpdateShop(body);
});
// 删除餐馆
router.post('/delete', reqPermission(), async (ctx: any) => {
  const { _id } = ctx.request.body;
  ctx.body = await DeleteShop(_id);
});
// 获取餐馆列表
router.get('/list', async (ctx: any) => {
  const query = ctx.request.query;
  ctx.body = await getShopList(query);
});
// 获取餐馆信息
router.get('/info', async (ctx: any) => {
  const { _id } = ctx.request.query;
  ctx.body = await getShopInfo(_id);
});
// 获取餐馆列表
router.get('/shop_list', async (ctx: any) => {
  ctx.body = await shopList();
});

// 修改餐馆食品安全信息
router.post('/updateinfo', async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await UpdateInfoShop({
    _id: body._id,
    params: body.data
  });
});
// 获取餐馆食品分类列表
router.get('/catelist', async (ctx: any) => {
  const { shop_id } = ctx.request.query;
  ctx.body = await getShopCateList(shop_id);
});
// 添加餐馆食品分类
router.post('/addcate', async (ctx: any) => {
  const body = ctx.request.body;
  ctx.body = await AddShopCate(body);
});

export default router