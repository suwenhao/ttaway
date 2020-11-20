"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandle = void 0;
/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const constant_1 = require("../conf/constant");
const jwt = require("jsonwebtoken");
const ResModel_1 = require("../model/ResModel");
const ErrorInfo_1 = require("../model/ErrorInfo");
exports.ErrorHandle = () => {
    return async (ctx, next) => {
        try {
            const token = ctx.header.authorization;
            if (token) {
                let payload;
                try {
                    payload = jwt.verify(token.split(" ")[1], constant_1.JWT_KEY);
                    ctx.manage = {
                        username: payload.username,
                        root: payload.root,
                        _id: payload._id
                    };
                }
                catch (error) {
                    //token过期 生成新的token
                    let newToken = jwt.sign({
                        username: ctx.manage.username,
                        _id: ctx.manage._id,
                        root: ctx.manage.root,
                    }, constant_1.JWT_KEY, { expiresIn: 60 * 30 });
                    //将新token放入Authorization中返回给前端
                    ctx.res.setHeader('Authorization', newToken);
                }
            }
        }
        catch (error) { }
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.status = 401;
                return new ResModel_1.ErrorModel(ErrorInfo_1.notTokenAndTokenExpiredFileInfo);
            }
            else {
                throw err;
            }
        });
    };
};
exports.default = {
    ErrorHandle: exports.ErrorHandle
};
//# sourceMappingURL=errorHandle.js.map