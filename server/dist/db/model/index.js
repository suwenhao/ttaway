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
exports.OrderModel = exports.MyaddressModel = exports.AreaModel = exports.UserModel = exports.SpecModel = exports.FoodModel = exports.FoodCateModel = exports.PromotionModel = exports.TraitModel = exports.ActivitieModel = exports.ShopModel = exports.RoleModel = exports.ManageModel = exports.CategorieModel = exports.CityModel = void 0;
const City_1 = require("./City"); // 城市列表
const Categorie_1 = require("./Categorie"); //商品分类
const Manage_1 = require("./Manage"); //管理员
const Role_1 = require("./Role"); // 角色
const Shop_1 = require("./Shop"); // 角色
const Activitie_1 = require("./Activitie"); // 优惠活动
const Trait_1 = require("./Trait"); // 餐馆特点
const Promotion_1 = require("./Promotion"); // 餐馆特点
const FoodCate_1 = require("./FoodCate"); // 餐馆食品分类
const Food_1 = require("./Food"); // 食品
const Spec_1 = require("./Spec"); // 食品规格
const User_1 = require("./User"); // 用户
const Area_1 = require("./Area"); // 省市区
const Myaddress_1 = require("./Myaddress"); // 我的地址
const Order_1 = require("./Order"); // 订单
exports.CityModel = City_1.default;
exports.CategorieModel = Categorie_1.default;
exports.ManageModel = Manage_1.default;
exports.RoleModel = Role_1.default;
exports.ShopModel = Shop_1.default;
exports.ActivitieModel = Activitie_1.default;
exports.TraitModel = Trait_1.default;
exports.PromotionModel = Promotion_1.default;
exports.FoodCateModel = FoodCate_1.default;
exports.FoodModel = Food_1.default;
exports.SpecModel = Spec_1.default;
exports.UserModel = User_1.default;
exports.AreaModel = Area_1.default;
exports.MyaddressModel = Myaddress_1.default;
exports.OrderModel = Order_1.default;
exports.default = {
    CityModel: City_1.default,
    CategorieModel: Categorie_1.default,
    ManageModel: Manage_1.default,
    RoleModel: Role_1.default,
    ShopModel: Shop_1.default,
    ActivitieModel: Activitie_1.default,
    TraitModel: Trait_1.default,
    PromotionModel: Promotion_1.default,
    FoodCateModel: FoodCate_1.default,
    FoodModel: Food_1.default,
    SpecModel: Spec_1.default,
    UserModel: User_1.default,
    AreaModel: Area_1.default,
    MyaddressModel: Myaddress_1.default,
    OrderModel: Order_1.default
};
//# sourceMappingURL=index.js.map