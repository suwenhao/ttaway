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
exports.userValidate = void 0;
const _validator_1 = require("./_validator");
const SCHEMA = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
            maxLength: 255,
            minLength: 4
        },
        password: {
            type: 'string',
            pattern: '^[0-9a-zA-Z_]{1,}$',
            maxLength: 255,
            minLength: 4
        },
        new_password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        phone: {
            type: 'string',
            pattern: '^1(3|4|5|6|7|8|9)\d{9}$',
        },
        email: {
            type: 'string',
            pattern: '^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$',
        }
    }
};
// 执行校验
/**
 * 校验用户数据格式
 * @param {object} data 待校验用户数据
 */
exports.userValidate = (data = {}) => {
    return _validator_1.validator(SCHEMA, data);
};
exports.default = {
    userValidate: exports.userValidate
};
//# sourceMappingURL=user.js.map