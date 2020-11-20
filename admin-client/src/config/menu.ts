export interface IMenu{
  icon?: string;
  path: string;
  title: string;
  children?: IMenu[]
}

const menuList: IMenu[] = [
  {
    title: '首页',
    path: '/home',
    icon: 'home'
  },
  {
    title: '数据管理',
    path: '/appstore',
    icon: 'laptop',
    children: [
      {
        title: '分类管理',
        path: '/category',
        icon: 'appstore'
      },
      {
        title: '餐馆列表',
        path: '/shoplist',
        icon: 'shop',
      },
      {
        title: '食品列表',
        path: '/foodlist',
        icon: 'coffee'
      },
      {
        title: '订单列表',
        path: '/orderlist',
        icon: 'account-book'
      },
      {
        title: '增加餐馆',
        path: '/addshop',
        icon: 'plus'
      },
    ]
  },
  {
    title: '系统管理',
    path: '/manage',
    icon: 'setting',
    children: [
      {
        title: '用户管理',
        path: '/user',
        icon: 'user'
      },
      {
        title: '角色管理',
        path: '/role',
        icon: 'team'
      },
    ]
  },
  {
    title: '图表',
    path: '/charts',
    icon: 'pie-chart',
    children: [
      {
        title: '柱状图',
        path: '/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        path: '/line',
        icon: 'line-chart'
      },
      {
        title: '扇形图',
        path: '/pie',
        icon: 'pie-chart'
      }
    ]
  }
]

export default menuList