"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = exports.SuccessModel = void 0;
/**
 *  基础模型
 */
class BaseModel {
    constructor({ erron, data, message }) {
        this.erron = erron;
        this.data = data;
        this.message = message;
    }
}
/**
 *  成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            erron: 0,
            data,
            message: null
        });
    }
}
exports.SuccessModel = SuccessModel;
/**
 *  失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ erron, message }) {
        super({
            erron,
            message,
            data: null
        });
    }
}
exports.ErrorModel = ErrorModel;
exports.default = {
    SuccessModel,
    ErrorModel
};
//# sourceMappingURL=ResModel.js.map