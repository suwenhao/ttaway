/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */

import City from './City' // 城市列表
import Categorie from './Categorie' //商品分类
import Manage from './Manage' //管理员
import Role from './Role'  // 角色
import Shop from './Shop'  // 角色
import Activitie from './Activitie'  // 优惠活动
import Trait from './Trait'  // 餐馆特点
import Promotion from './Promotion'  // 餐馆特点
import FoodCate from './FoodCate'  // 餐馆食品分类
import Food from './Food'  // 食品
import Spec from './Spec'  // 食品规格
import User from './User'  // 用户
import Area from './Area'  // 省市区
import Myaddress from './Myaddress'  // 我的地址
import Order from './Order' // 订单

export const CityModel = City
export const CategorieModel = Categorie
export const ManageModel = Manage
export const RoleModel = Role
export const ShopModel = Shop
export const ActivitieModel = Activitie
export const TraitModel = Trait
export const PromotionModel = Promotion
export const FoodCateModel = FoodCate
export const FoodModel = Food
export const SpecModel = Spec
export const UserModel = User
export const AreaModel = Area
export const MyaddressModel = Myaddress
export const OrderModel = Order

export default {
  CityModel: City,
  CategorieModel: Categorie,
  ManageModel: Manage,
  RoleModel: Role,
  ShopModel: Shop,
  ActivitieModel: Activitie,
  TraitModel: Trait,
  PromotionModel: Promotion,
  FoodCateModel: FoodCate,
  FoodModel: Food,
  SpecModel: Spec,
  UserModel: User,
  AreaModel: Area,
  MyaddressModel: Myaddress,
  OrderModel: Order
} 