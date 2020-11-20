/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { info, create, update, list, remove, idinfo } from '../../services/sys/manage'
import { queryRole } from '../../services/sys/role'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import { doCrypto } from '../../utils/cryp'
import {
  addManageNameExistInfo,
  addManageFailInfo,
  editManageFailInfo,
  getManageListFailInfo,
  manageUpdateInfoFailInfo,
  manageNotNameFailInfo,
  manageNotPwsFailInfo
} from '../../model/ErrorInfo'
import { IManageRes } from '../../types/manage'


/**
 * 添加管理员
 * @param {string} username 管理员
 * @param {string} password 密码
 */
export const addAndUpdate = async (params: IManageRes) => {
  const manageInfo: IManageRes = await info(params.username)
  if (params._id) {
    let data: any = {}
    if (!params.username) {
      return new ErrorModel(manageNotNameFailInfo)
    }
    data._id = params._id
    data.username = params.username
    if (params.email) data.email = params.email;
    if (params.phone) data.phone = params.phone;
    if (params.role_id) data.role_id = params.role_id;
    try {
      let res = await update(data)
      return new SuccessModel()
    } catch (ex) {
      return new ErrorModel(editManageFailInfo)
    }
  } else {
    if (manageInfo) {
      // 管理员已存在
      return new ErrorModel(addManageNameExistInfo)
    } else {
      let data: any = {}
      if (!params.username) {
        return new ErrorModel(manageNotNameFailInfo)
      }
      if (!params.password) {
        return new ErrorModel(manageNotPwsFailInfo)
      }
      data.username = params.username
      data.password = doCrypto(params.password)
      if (params.email) data.email = params.email;
      if (params.phone) data.phone = params.phone;
      if (params.role_id) data.role_id = params.role_id;
      try {
        let res = await create(data)
        return new SuccessModel(res)
      } catch (ex) {
        return new ErrorModel(addManageFailInfo)
      }
    }
  }
}
/**
 * 删除管理员
 * @param {string} _id 管理员_id
 */
export const deleteManage = async (_id: string) => {
  try {
    let manageRes = await remove(_id)
    return new SuccessModel(manageRes)
  } catch (ex) {
    return new ErrorModel(getManageListFailInfo)
  }
}
/**
 * 获取管理员列表
 * @param {string} username 管理员
 * @param {string} password 密码
 */
export const getManageList = async () => {
  try {
    let manageRes = await list()
    return new SuccessModel(manageRes)
  } catch (ex) {
    return new ErrorModel(getManageListFailInfo)
  }
}
/**
 * 获取管理员更新信息后的菜单
 * @param {string} _id _id
 */
export const getNewManage = async (_id: string) => {
  try {
    let manageRes: any = await idinfo(_id)
    if (manageRes) {
      let menus: string[] = []
      if (manageRes.role_id) {
        const roleRes: any = await queryRole(manageRes.role_id)
        if (roleRes) {
          menus = roleRes.menus
        }
      } else {
        if (manageRes.username !== 'admin') {
          menus = ['/home']
        }
      }
      let data = {
        username: manageRes.username,
        _id: manageRes._id,
        root: manageRes.root,
        role_id: manageRes.role_id ? manageRes.role_id : '',
        email: manageRes.email ? manageRes.email : '',
        menus,
        phone: manageRes.phone ? manageRes.phone : ''
      }
      return new SuccessModel(data)
    } else {
      return new ErrorModel(manageUpdateInfoFailInfo)
    }
  } catch (ex) {
    return new ErrorModel(manageUpdateInfoFailInfo)
  }
}