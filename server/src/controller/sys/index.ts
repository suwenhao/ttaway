/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { info as getManageInfo } from '../../services/sys/manage'
import { queryRole } from '../../services/sys/role'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import * as jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../conf/constant'
import { doCrypto } from '../../utils/cryp'
import {
  addManageNotExistInfo,
  manageNameOrManagePassFailInfo,
  updateFileFailInfo
} from '../../model/ErrorInfo'
import { IManage, IManageRes } from '../../types/manage';

/**
 * 管理员账号是否存在
 * @param {string} username 管理员
 */
export const isExist = async (username?: string) => {
  const manageInfo = await getManageInfo(username)
  if (manageInfo) {
    return new SuccessModel()
  } else {
    return new ErrorModel(addManageNotExistInfo)
  }
}

/**
 * 管理员登录
 * @param {string} username 管理员
 * @param {string} password 密码
 */
export const loginManage = async ({ username, password }: IManage) => {
  const manageInfo: IManageRes = await getManageInfo(username, doCrypto(password))
  if (manageInfo) {
    let menus: string[] = []
    if (manageInfo.role_id) {
      const roleRes: any = await queryRole(manageInfo.role_id)
      if (roleRes) {
        menus = roleRes.menus
      }
    } else {
      if (!manageInfo.root) {
        menus = ['/home']
      }
    }
    let data = jwt.sign({
      username: manageInfo.username,
      _id: manageInfo._id,
      root: manageInfo.root,
    }, JWT_KEY, { expiresIn: 60 * 60 * 24})
    return new SuccessModel({
      token: data,
      username: manageInfo.username,
      _id: manageInfo._id,
      root: manageInfo.root,
      role_id: manageInfo.role_id?manageInfo.role_id:'',
      email: manageInfo.email?manageInfo.email:'',
      menus,
      phone: manageInfo.phone?manageInfo.phone:''
    })
  } else {
    return new ErrorModel(manageNameOrManagePassFailInfo)
  }
}
// 上传文件
export const updateFile = async (filename: any) => {
  try {
    return new SuccessModel({
      name: filename,
      url: 'http://localhost:3001/upload/' + filename
    })
  } catch (ex) {
    // console.log(ex)
    return new ErrorModel(updateFileFailInfo)
  }
}