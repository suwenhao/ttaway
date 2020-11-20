import axios from './http'
import jsonp from 'jsonp'
import { Request } from '../types'

// 根据ID获取详细
export interface IReqInfo {
  _id?: string;
}

//请求登录
export const reqLogin: Request<any> = async (params, self) => (
  await axios(self).post('/sys/login', params)
)

// 获取天气
const weatherUrl = 'http://api.map.baidu.com/telematics/v3/weather?'
export const reqWeather = (params: any, self?: any) => {
  let p = new Promise((resolve, reject) => {
    let urlQuery = `location=${params.location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(weatherUrl + urlQuery, {}, (err, data) => {
      // console.log(err, data)
      if (err) {
        reject({err, date: '', result: []})
      }
      try {
        if (data.status === 'success') {
          resolve({date: data.date, result: data.results})
        } else {
          reject(err)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
  return p
}

// 获取一级/二级分类
export interface IReqCategory{
  parent_id?: string;
}
export const reqCategory: Request<IReqCategory> = async (params: IReqCategory, self?: any) => (
  await axios(self).get('/api/categorie/list', {
    params
  })
)

// 添加分类
export interface IReqAddCategory {
  parent_id: number;
  category_name: string;
}
export const reqAddCategory: Request<IReqAddCategory> = async (params: IReqAddCategory, self?: any) => (
  await axios(self).post('/manage/category/add', params)
)

// 更新分类
export interface IReqEditCategory {
  category_id: number;
  category_name: string;
}
export const reqUpdateCategory: Request<IReqEditCategory> = async (params: IReqEditCategory, self?: any) => (
  await axios(self).post('/manage/category/update', params)
)

// 根据_id获取分类
export const reqIdCategory: Request<IReqInfo> = async (params: IReqInfo, self?: any) => (
  await axios(self).get('/api/categorie/info', {
    params
  })
)

// 获取角色列表
export const reqRole: Request<IReqInfo> = async (params: IReqInfo = {}, self?: any) => (
  await axios(self).get('/sys/role/list', {
    params
  })
)
// 添加角色
export interface IReqAddRole {
  _id?: string;
  role_name?: string;
}
export const reqAddRole: Request<IReqAddRole> = async (params: IReqAddRole = {}, self?: any) => (
  await axios(self).post('/sys/role/add', params)
)
// 删除角色
export const reqDeleteRole: Request<IReqInfo> = async (params: IReqInfo = {}, self?: any) => (
  await axios(self).post('/sys/role/delete', params)
)
// 修改角色
export const reqUpdateRole: Request<IReqAddRole> = async (params: IReqAddRole = {}, self?: any) => (
  await axios(self).post('/sys/role/update', params)
)
// 设置角色权限
export interface IReqSetRolePermission {
  auth_name?: string;
  auth_time?: number;
  create_time?: number;
  menus?: any;
  name?: string;
  __v?: number;
  _id?: string;
}
export const reqSetRolePermission: Request<IReqSetRolePermission> = async (params: IReqSetRolePermission = {}, self?: any) => (
  await axios(self).post('/sys/role/set_permission', params)
)
// 管理员列表
export interface IReqUserList {

}
export const reqUserList: Request<IReqUserList> = async (params: IReqUserList = {}, self?: any) => (
  await axios(self).get('/sys/manage/list', {params})
)
// 增加管理员
export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  role_id?: string;
}
export const reqAddUser: Request<IUser> = async (params: IUser = {}, self?: any) => (
  await axios(self).post('/sys/manage/add', params)
)
// 修改管理员
export const reqUpdateUser: Request<IUser> = async (params: IUser = {}, self?: any) => (
  await axios(self).post('/sys/manage/update', params)
)
// 删除管理员
export const reqDeleteUser: Request<IUser> = async (params: IUser = {}, self?: any) => (
  await axios(self).post('/sys/manage/delete', params)
)
// 获取管理员更新信息
export const reqUserUpdateInfo: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/manage/updateinfo', { params })
)

// 获取餐馆特点列表
export const reqTraitList: Request<IReqInfo> = async (params: IReqInfo = {}, self?: any) => (
  await axios(self).get('/api/trait/list', { params })
)

// 获取详细地址列表
export const reqAddressList: Request<any> = async (params: any = { query: '车陂', region: '广州' }, self?: any) => (
  await axios(self).get('/api/city/address_list', { params })
)

// 获取优惠活动列表
export const reqPromotionList: Request<any> = async (params: any = { }, self?: any) => (
  await axios(self).get('/api/promotion/list', { params })
)

// 增加餐馆
export const reqAddShop: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/shop/add', params)
)
// 修改餐馆
export const reqEditShop: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/shop/update', params)
)
// 删除餐馆
export const reqDeleteShop: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/shop/delete', params)
)

// 获取餐馆列表
export const reqShopList: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/shop/list', { params })
)
// 获取餐馆详细信息
export const reqShopInfo: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/shop/info', { params })
)
// 修改餐馆详细信息
export const reqEditShopInfo: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/shop/updateinfo', params)
)
// 获取餐馆食品分类列表
export const reqShopFoodCateList: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/shop/catelist', { params })
)
// 添加餐馆食品分类
export const reqAddShopFoodCate: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/shop/addcate', params)
)
// 添加食品
export const reqAddFood: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/food/add', params)
)
// 食品列表
export const reqFoodList: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/food/list', { params })
)
// 食品详情
export const reqFoodInfo: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).get('/sys/food/info', { params })
)
// 修改食品
export const reqEditFood: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/food/update', params)
)
// 删除食品
export const reqDeleteFood: Request<any> = async (params: any = {}, self?: any) => (
  await axios(self).post('/sys/food/delete', params)
)
