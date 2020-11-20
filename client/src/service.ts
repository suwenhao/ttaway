import request from "./utils/request"
/**
 * 获取城市列表
*/
export const getCityList = <T>(data: any = {}) => request<T>({
    url: `/api/city/list`,
    data
});
/**
 * 获取城市输入地点列表
*/
export const getSearchAddressList = <T>(data: any = {query: '车陂', region: '广州'}) => request<T>({
    url: `/api/city/address_list`,
    data
})
/**
 * 获取城市输入地点列表
*/
export const getAddressDetail = <T>(data: any = {geohash: '23.12013,113.391723'}) => request<T>({
    url: `/api/city/address_detail`,
    data
})
/**
 * 获取分类列表
*/
export const getCategorieList = <T>(data: {parent_id: number} = {parent_id: 0}) => request<T>({
    url: `/api/categorie/list`,
    data
})

/**
 * 获取餐馆列表
*/
export const getShoppingList = <T>(data: any) => request<T>({
    url: `/api/shopping/restaurants`,
    data
})

/**
 * 获取优惠活动列表
*/
export const getPromotionList = <T>(data: any) => request<T>({
    url: `/api/promotion/list`,
    data
})

/**
 * 获取优惠活动列表
*/
export const getShopInfo = <T>(data: any) => request<T>({
    url: `/api/shopping/info`,
    data
})
/**
 * 获取验证码
*/
export const getSms = <T>(data: any) => request<T>({
    url: `/api/sms`,
    data
})
/**
 * 登录
*/
export const login = <T>(data: any) => request<T>({
    url: `/api/login`,
    method: 'post',
    data
})
/**
 * 获取个人信息
*/
export const getUserInfo = <T>(data: any) => request<T>({
    url: `/api/center/info`,
    data
})
/**
 * 获取个人地址列表
*/
export const getArealist = <T>(data: any) => request<T>({
    url: `/api/center/myaddress`,
    data
})
/**
 * 获取省市区列表
*/
export const getAreaData = <T>(data: any) => request<T>({
    url: `/api/center/area`,
    data
})
/**
 * 添加我的地址
*/
export const addMyAddress = <T>(data: any) => request<T>({
    url: `/api/center/add_address`,
    method: 'post',
    data
})
/**
 * 修改我的地址
*/
export const editMyAddress = <T>(data: any) => request<T>({
    url: `/api/center/edit_address`,
    method: 'post',
    data
})
/**
 * 删除我的地址
*/
export const deleteMyAddress = <T>(data: any) => request<T>({
    url: `/api/center/delete_address`,
    method: 'post',
    data
})
/**
 * 上传头像
*/
export const uploadAvatar = <T>(data: any) => request<T>({
    url: `/api/uploadfile`,
    method: 'post',
    data
})
/**
 * 保存订单
*/
export const saveOrder = <T>(data: any) => request<T>({
    url: `/api/order/save`,
    method: 'post',
    data
})
/**
 * 获取订单列表
*/
export const orderList = <T>(data: any) => request<T>({
    url: `/api/order/list`,
})