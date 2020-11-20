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
exports.validator = void 0;
const Ajv = require("ajv");
const ajv = new Ajv({
// allErrors: true  // 输出所有错误
});
/**
 * json schema 校验
 * @param {object} schema json schema 规则
 * @param {object} data 待校验数据
 */
exports.validator = (schema, data = {}) => {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
};
exports.default = {
    validator: exports.validator
};
//# sourceMappingURL=_validator.js.map