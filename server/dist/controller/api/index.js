"use strict";
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.logout = exports.getInfo = exports.loginManage = exports.getSms = void 0;
const user_1 = require("../../services/api/user");
const ResModel_1 = require("../../model/ResModel");
const cryp_1 = require("../../utils/cryp");
const path = require("path");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const ErrorInfo_1 = require("../../model/ErrorInfo");
/**
 * 获取验证码
 * @param {string} phone 手机号码
 */
exports.getSms = async ({ ctx, phone }) => {
    try {
        var Num = "";
        for (let i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        ctx.session.logininfo = {
            sms: Num,
            phone
        };
        return new ResModel_1.SuccessModel(ctx.session.logininfo);
    }
    catch (error) {
        return new ResModel_1.ErrorModel({
            erron: 10043,
            message: '获取验证码出错'
        });
    }
};
/**
 * 用户登录
 * @param {string} phone 手机号码
 * @param {string} sms 验证码
 */
exports.loginManage = async ({ sms, phone, ctx }) => {
    if (phone && sms) {
        if (ctx.session && ctx.session.logininfo) {
            if (ctx.session.logininfo.sms === sms && ctx.session.logininfo.phone === phone) {
                let result = await user_1.phone(phone);
                console.log(result);
                if (result) {
                    ctx.session.userinfo = result;
                    return new ResModel_1.SuccessModel(result);
                }
                else {
                    let res = await user_1.create({
                        phone,
                        username: phone,
                        password: cryp_1.doCrypto('123456')
                    });
                    let newRes = Object.assign({}, res);
                    delete newRes._doc.password;
                    ctx.session.userinfo = newRes._doc;
                    return new ResModel_1.SuccessModel(newRes._doc);
                }
            }
            else {
                return new ResModel_1.ErrorModel(ErrorInfo_1.phoneOrSmsFailInfo);
            }
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.phoneOrSmsFailInfo);
        }
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.queryUserFailInfo);
    }
};
/**
 * 获取用户信息
 * @param {string} _id id
 */
exports.getInfo = async ({ _id }) => {
    let result = await user_1.idinfo(_id);
    if (result) {
        return new ResModel_1.SuccessModel(result);
    }
    else {
        return new ResModel_1.ErrorModel(ErrorInfo_1.notUserFailInfo);
    }
};
/**
 * 退出登录
 * @param {string} _id id
 */
exports.logout = async ({ ctx }) => {
    ctx.session.userinfo = null;
    return new ResModel_1.SuccessModel(null);
};
/**
 * 上传图片
 * @param {object} params
 */
exports.uploadFile = async (params) => {
    let { base64, _id, avatar_image } = params;
    let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    let arr = base64.split(',');
    let mime = arr[0].match(/:(.*?);/)[1].split('/')[1];
    let dataBuffer = Buffer.from(base64Data, 'base64');
    let imgname = uuidv1() + '.' + mime;
    try {
        let root = path.join(__dirname, '../../public/upload/');
        fs.writeFileSync(root + imgname, dataBuffer);
        if (avatar_image) {
            fs.unlinkSync(root + avatar_image);
        }
        let result = await user_1.update({
            _id,
            avatar_image: imgname
        });
        if (result) {
            return new ResModel_1.SuccessModel({
                name: imgname,
                url: 'http://localhost:3001/upload/' + imgname
            });
        }
        else {
            return new ResModel_1.ErrorModel(ErrorInfo_1.editUserAvatarFailInfo);
        }
    }
    catch (error) {
        console.log(error);
        return new ResModel_1.ErrorModel(ErrorInfo_1.uploadImgFailInfo);
    }
};
//# sourceMappingURL=index.js.map