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
exports.reqPermission = void 0;
const ResModel_1 = require("../model/ResModel");
const ErrorInfo_1 = require("../model/ErrorInfo");
/**
 * 删除请求 中间件 不是超级管理员无法删除数据
 */
exports.reqPermission = () => {
    return async (ctx, next) => {
        // 校验
        const root = ctx.manage.root;
        if (!root) {
            // 验证失败
            ctx.body = new ResModel_1.ErrorModel(ErrorInfo_1.notPermissionFailInfo);
            return;
        }
        // 验证成功 继续
        await next();
    };
};
//# sourceMappingURL=reqPermission.js.map