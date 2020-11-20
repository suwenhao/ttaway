/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Router from "koa-router";
import { saveOrder, orderList } from "../../controller/api/order";
import { validatorUser } from "../../middleware/validator";
const router = new Router();

router.prefix("/api/order");

// 保存订单
router.post("/save", validatorUser, async (ctx: any, next) => {
  let { remark, json, tel, address, person } = ctx.request.body;
  let { _id } = ctx.session.userinfo;
  ctx.body = await saveOrder({
    remark,
    tel,
    address,
    person,
    json,
    _id,
  });
});
// 获取订单列表
router.get("/list", validatorUser, async (ctx: any, next) => {
  let { _id } = ctx.session.userinfo;
  ctx.body = await orderList({ _id });
});

export default router;
