/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
import * as Mongoose from 'mongoose'
import { doCrypto } from '../../utils/cryp'
const Schema = Mongoose.Schema;
let ManageSchema = new Schema({
  username: { type: String, unique: true, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  phone: String,  // 联系电话
  email: String, // 邮箱
  create_time: { type: Number, default: Date.now }, // 创建时间
  root: {type: Boolean, default: false},
  role_id: {
    type: Schema.Types.ObjectId,
  }
});

let ManageModel = Mongoose.model('manages', ManageSchema);

// 初始化默认超级管理员用户: admin/admin
ManageModel.findOne({ username: 'admin' }).then(user => {
  if (!user) {
    ManageModel.create({ username: 'admin', password: doCrypto('admin'), root: true })
      .then(user => {
        console.log('初始化用户: 用户名: admin 密码为: admin')
      })
  }
})

export default ManageModel
