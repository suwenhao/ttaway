/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
interface IProps {
  erron?: number;
  data?: any;
  message?: any;
}
/**
 *  基础模型 
 */
class BaseModel {
  erron?: number;
  data?: any;
  message?: string;
  constructor({ erron, data, message }: IProps) {
    this.erron = erron
    this.data = data
    this.message = message
  }
}

/**
 *  成功的数据模型 
 */

export class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      erron: 0,
      data,
      message: null
    })
  }
}

/**
 *  失败的数据模型
 */

export class ErrorModel extends BaseModel {
  constructor({ erron, message }: IProps) {
    super({
      erron,
      message,
      data: null
    })
  }
}

export default {
  SuccessModel,
  ErrorModel
}