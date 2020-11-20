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
exports.notTest = exports.isTest = exports.notProd = exports.isProd = exports.notDev = exports.isDev = void 0;
const ENV = process.env.NODE_ENV;
exports.isDev = ENV === 'dev';
exports.notDev = ENV !== 'dev';
exports.isProd = ENV === 'production';
exports.notProd = ENV !== 'production';
exports.isTest = ENV === 'test';
exports.notTest = ENV !== 'test';
//# sourceMappingURL=env.js.map