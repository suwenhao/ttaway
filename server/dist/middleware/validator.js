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
exports.validatorUser = exports.genUserValidator = exports.genValidator = void 0;
const ResModel_1 = require("../model/ResModel");
const ErrorInfo_1 = require("../model/ErrorInfo");
/**
 * 生产 user json schema 验证中间件
 * @param {object} userValidate 验证函数
 */
exports.genValidator = (validateFn) => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body;
        if (ctx.manage) {
            const root = ctx.manage.root;
            if (!root) {
                // 验证失败
                ctx.body = new ResModel_1.ErrorModel(ErrorInfo_1.notPermissionFailInfo);
                return;
            }
        }
        // 校验
        const error = validateFn(data);
        if (error) {
            // 验证失败
            ctx.body = new ResModel_1.ErrorModel(ErrorInfo_1.jsonSchemaFileInfo);
            return;
        }
        // 验证成功 继续
        await next();
    };
    return validator;
};
exports.genUserValidator = (validateFn) => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body;
        // 校验
        const error = validateFn(data);
        if (error) {
            // 验证失败
            ctx.body = new ResModel_1.ErrorModel(ErrorInfo_1.jsonSchemaFileInfo);
            return;
        }
        // 验证成功 继续
        await next();
    };
    return validator;
};
exports.validatorUser = async (ctx, next) => {
    if (ctx.session.userinfo) {
        // 验证成功 继续
        await next();
    }
    else {
        // 验证失败
        ctx.status = 401;
        ctx.body = new ResModel_1.ErrorModel({
            erron: 401,
            message: '用户信息不存在'
        });
    }
};
exports.default = {
    genValidator: exports.genValidator,
    genUserValidator: exports.genUserValidator,
    validatorUser: exports.validatorUser
};
//# sourceMappingURL=validator.js.map