"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notPageFailInfo = exports.notTokenAndTokenExpiredFileInfo = exports.notPermissionFailInfo = exports.getUserOrderFailInfo = exports.saveOrderFailInfo = exports.editUserAvatarFailInfo = exports.uploadImgFailInfo = exports.editUserFailInfo = exports.editMyAreaFailInfo = exports.addMyAreaFailInfo = exports.queryAreaListFailInfo = exports.queryMyAddressFailInfo = exports.notUserFailInfo = exports.phoneOrSmsFailInfo = exports.removeFoodFailInfo = exports.editFoodFailInfo = exports.queryFoodInfoFailInfo = exports.userFailInfo = exports.isExistUserFailInfo = exports.queryUserFailInfo = exports.querySearchAddressFailInfo = exports.queryRestaurantListFailInfo = exports.shopInfoFailInfo = exports.foodListFailInfo = exports.addFoodFailInfo = exports.addFoodCateFailInfo = exports.foodCateListFailInfo = exports.shopNotIDFailInfo = exports.shopListFailInfo = exports.editShopFailInfo = exports.removeShopFailInfo = exports.addShopFailInfo = exports.queryPromotionListFailInfo = exports.editRoleFailInfo = exports.addEditRoleNotIDFailInfo = exports.removeRoleFailInfo = exports.setPermissionFailInfo = exports.queryRoleListFailInfo = exports.addRoleFailInfo = exports.addEditRoleNotNameFailInfo = exports.manageUpdateInfoFailInfo = exports.editManageFailInfo = exports.manageNotIdFailInfo = exports.manageNotPwsFailInfo = exports.manageNotNameFailInfo = exports.getManageListFailInfo = exports.manageNameOrManagePassFailInfo = exports.jsonSchemaFileInfo = exports.addManageFailInfo = exports.addManageNameExistInfo = exports.addManageNotExistInfo = exports.updateFileFailInfo = exports.queryTraitListFailInfo = exports.queryCategorieListFailInfo = exports.querySearchAddressListFailInfo = exports.queryCityListFailInfo = void 0;
exports.queryCityListFailInfo = {
    erron: 10000,
    message: '查询获取城市列表出错'
};
exports.querySearchAddressListFailInfo = {
    erron: 10001,
    message: '查询地址列表出错'
};
exports.queryCategorieListFailInfo = {
    erron: 10002,
    message: '查询分类列表出错'
};
exports.queryTraitListFailInfo = {
    erron: 10003,
    message: '查询餐馆特点列表出错'
};
exports.updateFileFailInfo = {
    erron: 10004,
    message: '上传文件出错'
};
exports.addManageNotExistInfo = {
    erron: 10005,
    message: '管理员账号未存在'
};
exports.addManageNameExistInfo = {
    erron: 10006,
    message: '管理员账号已存在'
};
exports.addManageFailInfo = {
    erron: 10007,
    message: '添加管理员账号出错'
};
exports.jsonSchemaFileInfo = {
    erron: 10008,
    message: '数据格式校验错误'
};
exports.manageNameOrManagePassFailInfo = {
    erron: 10009,
    message: '管理员账号或密码错误'
};
exports.getManageListFailInfo = {
    erron: 10010,
    message: '获取管理员账号列表失败'
};
exports.manageNotNameFailInfo = {
    erron: 10011,
    message: '缺少账号名'
};
exports.manageNotPwsFailInfo = {
    erron: 10012,
    message: '缺少账号密码'
};
exports.manageNotIdFailInfo = {
    erron: 10013,
    message: '缺少账号_id'
};
exports.editManageFailInfo = {
    erron: 10014,
    message: '修改管理员账号出错'
};
exports.manageUpdateInfoFailInfo = {
    erron: 10015,
    message: '获取管理员更新后信息失败'
};
exports.addEditRoleNotNameFailInfo = {
    erron: 10016,
    message: '角色名字为空'
};
exports.addRoleFailInfo = {
    erron: 10017,
    message: '添加角色出错'
};
exports.queryRoleListFailInfo = {
    erron: 10018,
    message: '查询角色列表出错'
};
exports.setPermissionFailInfo = {
    erron: 10019,
    message: '设置角色权限出错'
};
exports.removeRoleFailInfo = {
    erron: 10020,
    message: '删除角色出错'
};
exports.addEditRoleNotIDFailInfo = {
    erron: 10021,
    message: '没有拿到角色_id'
};
exports.editRoleFailInfo = {
    erron: 10022,
    message: '修改角色出错'
};
exports.queryPromotionListFailInfo = {
    erron: 10023,
    message: '查询优惠活动出错'
};
exports.addShopFailInfo = {
    erron: 10024,
    message: '新增餐馆出错'
};
exports.removeShopFailInfo = {
    erron: 10025,
    message: '删除餐馆出错'
};
exports.editShopFailInfo = {
    erron: 10026,
    message: '修改餐馆出错'
};
exports.shopListFailInfo = {
    erron: 10027,
    message: '获取餐馆列表出错'
};
exports.shopNotIDFailInfo = {
    erron: 10028,
    message: '没有拿到餐馆_id'
};
exports.foodCateListFailInfo = {
    erron: 10029,
    message: '获取餐馆食品分类出错'
};
exports.addFoodCateFailInfo = {
    erron: 10030,
    message: '添加餐馆食品分类出错'
};
exports.addFoodFailInfo = {
    erron: 10031,
    message: '添加食品出错'
};
exports.foodListFailInfo = {
    erron: 10032,
    message: '获取食品列表出错'
};
exports.shopInfoFailInfo = {
    erron: 10033,
    message: '获取餐馆信息出错'
};
exports.queryRestaurantListFailInfo = {
    erron: 10034,
    message: '获取附近餐馆失败'
};
exports.querySearchAddressFailInfo = {
    erron: 10035,
    message: '获取当前地址信息失败'
};
exports.queryUserFailInfo = {
    erron: 10036,
    message: '获取用户失败'
};
exports.isExistUserFailInfo = {
    erron: 10037,
    message: '用户已存在'
};
exports.userFailInfo = {
    erron: 10038,
    message: '用户名或密码错误'
};
exports.queryFoodInfoFailInfo = {
    erron: 10039,
    message: '没有这个食品的信息'
};
exports.editFoodFailInfo = {
    erron: 10040,
    message: '修改食品出错'
};
exports.removeFoodFailInfo = {
    erron: 10040,
    message: '删除食品出错'
};
exports.phoneOrSmsFailInfo = {
    erron: 10041,
    message: '手机号码或验证码出错'
};
exports.notUserFailInfo = {
    erron: 10042,
    message: '用户信息不存在'
};
exports.queryMyAddressFailInfo = {
    erron: 10043,
    message: '获取我的地址列表出错'
};
exports.queryAreaListFailInfo = {
    erron: 10044,
    message: '获取省市区列表出错'
};
exports.addMyAreaFailInfo = {
    erron: 10045,
    message: '添加我的地址出错'
};
exports.editMyAreaFailInfo = {
    erron: 10046,
    message: '修改我的地址出错'
};
exports.editUserFailInfo = {
    erron: 10047,
    message: '修改用户信息出错'
};
exports.uploadImgFailInfo = {
    erron: 10048,
    message: '上传出错'
};
exports.editUserAvatarFailInfo = {
    erron: 10049,
    message: '修改头像出错'
};
exports.saveOrderFailInfo = {
    erron: 10050,
    message: '保存订单失败'
};
exports.getUserOrderFailInfo = {
    erron: 10051,
    message: '获取用户订单列表出错'
};
exports.notPermissionFailInfo = {
    erron: 10402,
    message: '权限不足'
};
exports.notTokenAndTokenExpiredFileInfo = {
    erron: 10401,
    message: '未授权，访问被拒绝'
};
exports.notPageFailInfo = {
    erron: 10404,
    message: '未找到该页面'
};
//# sourceMappingURL=ErrorInfo.js.map