/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { phone as queryPhoneGetUser, create, idinfo, update } from '../../services/api/user'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import { doCrypto } from '../../utils/cryp'
import * as path from 'path'
import * as fs from 'fs'
import * as uuidv1 from 'uuid/v1'
import {
  notUserFailInfo,
  phoneOrSmsFailInfo,
  queryUserFailInfo,
  editUserFailInfo,
  uploadImgFailInfo,
  editUserAvatarFailInfo
} from '../../model/ErrorInfo'

/**
 * 获取验证码
 * @param {string} phone 手机号码
 */
export const getSms = async ({ctx, phone}: any) => {
  try {
    var Num = "";
    for(let i=0; i<6; i++)
    {
      Num+=Math.floor(Math.random()*10);
    }
    ctx.session.logininfo = {
      sms: Num,
      phone
    }
    return new SuccessModel(ctx.session.logininfo)
  } catch (error) {
    return new ErrorModel({
      erron: 10043,
      message: '获取验证码出错'
    })
  }
}

/**
 * 用户登录
 * @param {string} phone 手机号码
 * @param {string} sms 验证码
 */
export const loginManage = async ({ sms, phone, ctx }: any) => {
  if (phone&&sms) {
    if (ctx.session&&ctx.session.logininfo) {
      if (ctx.session.logininfo.sms === sms&&ctx.session.logininfo.phone===phone) {
        let result = await queryPhoneGetUser(phone)
        console.log(result)
        if (result) {
          ctx.session.userinfo = result
          return new SuccessModel(result)
        } else {
          let res: any = await create({
            phone,
            username: phone,
            password: doCrypto('123456')
          })
          let newRes = Object.assign({}, res)
          delete newRes._doc.password
          ctx.session.userinfo = newRes._doc
          return new SuccessModel(newRes._doc)
        }
      } else {
        return new ErrorModel(phoneOrSmsFailInfo)
      }
    } else {
      return new ErrorModel(phoneOrSmsFailInfo)
    }
  } else {
    return new ErrorModel(queryUserFailInfo)
  }
}
/**
 * 获取用户信息
 * @param {string} _id id
 */
export const getInfo = async({_id}: any) => {
  let result = await idinfo(_id)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(notUserFailInfo)
  }
}
/**
 * 退出登录
 * @param {string} _id id
 */
export const logout = async({ctx}: any) => {
  ctx.session.userinfo = null
  return new SuccessModel(null)
}

/**
 * 上传图片
 * @param {object} params
 */
export const uploadFile = async (params: any) => {
  let { base64, _id, avatar_image } = params
  let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  let arr = base64.split(',')
  let mime = arr[0].match(/:(.*?);/)[1].split('/')[1]
  let dataBuffer = Buffer.from(base64Data, 'base64');
  let imgname = uuidv1() + '.'+ mime
  try {
    let root = path.join(__dirname, '../../public/upload/');
    fs.writeFileSync(root + imgname, dataBuffer);
    if (avatar_image) {
      fs.unlinkSync(root + avatar_image)
    }
    let result = await update({
      _id,
      avatar_image: imgname
    })
    if (result) {
      return new SuccessModel({
        name: imgname,
        url: 'http://localhost:3001/upload/' + imgname
      })
    } else {
      return new ErrorModel(editUserAvatarFailInfo)
    }
  } catch (error) {
    console.log(error)
    return new ErrorModel(uploadImgFailInfo)
  }
  
}

