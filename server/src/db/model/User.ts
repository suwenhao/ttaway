/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'
// @ts-ignore
import { getName } from '../../utils/index'

const Schema = Mongoose.Schema;
let UserSchema = new Schema({
  username: { type: String, unique: true, required: true }, // 用户名
  realName: { type: String, default: `用户${getName()}` }, // 昵称
  password: { type: String, required: true }, // 密码
  phone: {type: String, unique: true, default: ''},  // 联系电话
  email: {type: String, default: ''}, // 邮箱
  avatar_image: {type: String, default: ''},
  create_time: { type: Number, default: Date.now }, // 创建时间
  is_new_user: { type: Boolean, default: true }, // 是否新用户
});

let UserModel = Mongoose.model('users', UserSchema);

export default UserModel
