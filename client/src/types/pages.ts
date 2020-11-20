
// 城市信息接口
export interface CitiesData {
    abbr?: string;
    id?: number;
    area_code?: string;
    is_map: boolean;
    _id: string;
    latitude?: number;
    longitude?: number;
    sort?: number;
    name?: string;
    pinyin?: string;
}

export interface Response<T>{
    erron?: number;
    message?: string;
    data: T;
}

// 搜索城市信息
export interface SearchCities {
    address?: string;
    district?: string;
    city?: string;
    province?: string;
    name?: string;
    location?: {
        lat: number;
        lng: number;
    },
    id?: string;
    detail_info?: any;
    [key: string]: any;
}

// 菜单信息
export interface MenuInfo {
    description: string
    icon_url: string
    id: number
    image_url: string
    link: string
    title: string
    title_color: string
}

export interface ShopInfo {
    address: string
    category: string
    distance: string
    float_delivery_fee: string
    float_minimum_order_amount: string
    image_path: string
    name: string
    order_lead_time: string
    promotion_info: string
    phone: string
    id: number
    longitude: number
    rating: number
    rating_count: number
    recent_order_num: number
}
