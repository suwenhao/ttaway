/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'

let roleSchema = new Mongoose.Schema({
  name: { type: String }, // 角色名称
  auth_name: String, // 授权人
  auth_time: Number, // 授权时间
  create_time: { type: Number, default: Date.now }, // 创建时间
  menus: { type: Array, default: ['/home'] } // 所有有权限操作的菜单path的数组
});

let roleModel = Mongoose.model('roles', roleSchema);

export default roleModel