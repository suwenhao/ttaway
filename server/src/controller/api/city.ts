/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import { queryCityList, querySearchAddressList, queryAddrDetail } from '../../services/api/city'
import { SuccessModel, ErrorModel } from '../../model/ResModel'
import {
    queryCityListFailInfo,
    querySearchAddressListFailInfo,
    querySearchAddressFailInfo,
} from '../../model/ErrorInfo'

/**
 *  获取城市列表
 * @param {string} name 查询的城市名字
 */
export const getCityList = async (name?: string) => {
    const citylist = await queryCityList(name)
    if (citylist) {
        return new SuccessModel(citylist)
    } else {
        return new ErrorModel(queryCityListFailInfo)
    }
};
/**
 *   模糊查询当前输入的地址在当前城市的列表
 * @param {object} query 地图需要的参数
 */
export const getSearchAddressList = async (query: any) => {
    const addresslist = await querySearchAddressList(query)
    if (addresslist) {
        return new SuccessModel(addresslist)
    } else {
        return new ErrorModel(querySearchAddressListFailInfo)
    }
};
/**
 *   获取当前经纬度地址信息
 * @param {object} query 地图需要的参数
 */
export const getAddrDetail = async (query: any) => {
    // console.log(query.geohash)
    const address = await queryAddrDetail(query.geohash)
    if (address) {
        return new SuccessModel(address)
    } else {
        return new ErrorModel(querySearchAddressFailInfo)
    }
}