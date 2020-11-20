/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from 'koa-router'
import { getInfo } from '../../controller/api/index'
import {
  getAreaList,
  getAreaData,
  addAddress,
  editAddress,
  deleteAddress,
 } from '../../controller/api/center'
 // @ts-ignore
import uuidv1 from 'uuid/v1'
import { validatorUser } from '../../middleware/validator'
const router = new Router();

router.prefix('/api/center');

// 获取用户信息
router.get('/info', validatorUser, async (ctx: any, next) => {
  const { _id } = ctx.request.query
  ctx.body = await getInfo({
    _id,
  })
})
// 获取用户地址列表
router.get('/myaddress', validatorUser, async (ctx: any, next) => {
  const { userId } = ctx.request.query
  ctx.body = await getAreaList({
    userId,
  })
})
// 获取用户地址列表
router.get('/area', validatorUser, async (ctx: any, next) => {
  ctx.body = await getAreaData()
})
// 用户地址添加
router.post('/add_address', validatorUser, async (ctx: any, next) => {
  const params = ctx.request.body
  ctx.body = await addAddress(params)
})
// 用户地址修改
router.post('/edit_address', validatorUser, async (ctx: any, next) => {
  const params = ctx.request.body
  ctx.body = await editAddress(params)
})
// 删除用户地址
router.post('/delete_address', validatorUser, async (ctx: any, next) => {
  const {_id} = ctx.request.body
  ctx.body = await deleteAddress(_id)
})
export default router