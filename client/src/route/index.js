import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 404
import Error from '@/pages/error'
// 布局
const Layout = () => import('@/components/Layout')
// 主页
const Home = () => import('@/pages/home')
// 选择城市页面
const CitiesDetail = () => import('@/pages/cities/detail');
const CitiesList = () => import('@/pages/cities/list');
// 餐馆页面
const Shop = () => import('@/pages/shop');
// 个人页面
const My = () => import('@/pages/my');
// 个人资料
const Info = () => import('@/pages/center/info');
// 我的地址
const Address = () => import('@/pages/address/list')
// 登录
const Login = () => import('@/pages/login')
const Register = () => import('@/pages/register')
// 我的地址添加编辑删除
const AddressAddEdit = () => import('@/pages/address/addedit')
// 我的红包
const Hongbao = () => import('@/pages/hongbao')
// 我的收藏
const Favorite = () => import('@/pages/favorite')
// 常见问题
const Problem = () => import('@/pages/problem')
// 客服咨询
const Customer = () => import('@/pages/customer')
// 订单页面
const Order = () => import('@/pages/order/order')
// 确认订单页面
const Pay = () => import('@/pages/order/pay')
// 订单详情
const OrderDetail = () => import('@/pages/order/detail')

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/order',
                name: 'order',
                component: Order,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/orderDetail',
                name: 'orderDetail',
                component: OrderDetail,
                meta: {
                    keepAlive: false,
                }
            },
            {
                path: '/my',
                name: 'my',
                component: My,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/cities/list',
                name: 'citiesList',
                component: CitiesList,
                meta: {
                    keepAlive: true, 
                }
            },
            {
                path: '/cities/detail',
                name: 'citiesDetial',
                component: CitiesDetail,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/hongbao',
                name: 'hongbao',
                component: Hongbao,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/favorite',
                name: 'favorite',
                component: Favorite,
                meta: {
                    keepAlive: false, 
                }
            },
            {
                path: '/problem',
                name: 'problem',
                component: Problem,
                meta: {
                    keepAlive: true, 
                }
            },
            {
                path: '/customer',
                name: 'customer',
                component: Customer,
                meta: {
                    keepAlive: false, 
                }
            },
        ]
    },
    {
        path: '/addrlist',
        name: 'addrlist',
        component: Address,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/addrlist/:type',
        name: 'addrlistpay',
        component: Address,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/addaddress',
        name: 'addaddress',
        component: AddressAddEdit,
        meta: {
            state: 'add',
            keepAlive: false, 
        }
    },
    {
        path: '/editaddress',
        name: 'editaddress',
        component: AddressAddEdit,
        meta: {
            state: 'edit',
            keepAlive: false, 
        }
    },
    {
        path: '/info',
        name: 'info',
        component: Info,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            keepAlive: false, 
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            keepAlive: false, 
        }
    },
    // 404
    { path: '/*', component: Error }
]

export default new Router({
    mode: 'hash',
    routes
})