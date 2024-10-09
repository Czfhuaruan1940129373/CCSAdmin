import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
  // {
  //   path: '/level',
  //   component: '#',
  //   redirect: '/level/menu1/menu1-1/menu1-1-1',
  //   name: 'Level',
  //   meta: {
  //     title: 'router.level',
  //     icon: 'carbon:skill-level-advanced'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       name: 'Menu1',
  //       component: '##',
  //       redirect: '/level/menu1/menu1-1/menu1-1-1',
  //       meta: {
  //         title: 'router.menu1'
  //       },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu11',
  //           component: '##',
  //           redirect: '/level/menu1/menu1-1/menu1-1-1',
  //           meta: {
  //             title: 'router.menu11',
  //             // alwaysShow: true
  //           },
  //           children: [
  //             {
  //               path: 'menu1-1-1',
  //               name: 'Menu111',
  //               component: 'views/Level/Menu111',
  //               meta: {
  //                 title: 'router.menu111'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-2',
  //           name: 'Menu12',
  //           component: 'views/Level/Menu12',
  //           meta: {
  //             title: 'router.menu12'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2Demo',
  //       component: 'views/Level/Menu2',
  //       meta: {
  //         title: 'router.menu2'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/home',
    component: '#',
    redirect: '/home/homeData',
    name: 'Home',
    meta: {
      title: 'router.dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true,
    },
    children: [
      {
        path: 'homeData',
        name: 'HomeData',
        component: 'views/Home/HomeData',
        meta: {
          title: 'router.workplace',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: 'views/Home/Analysis',
        meta: {
          title: 'router.analysis'
        }
      }
    ]
  },
  {
    path: '/select',
    component: '#',
    redirect: '/home/HomeData',
    name: 'Select',
    meta: {
      title: 'router.caliResSearch',
      icon: 'carbon:search'
    },
    children: [
      {
        path: 'devSelect',
        name: 'DevSelect',
        component: 'views/Select/DevSelect',
        meta: {
          title: 'router.devCaliResSearch'
        }
      },
      {
        path: 'globalSelect',
        name: 'GlobalSelect',
        component: 'views/Select/GlobalSelect',
        meta: {
          title: 'router.globalCaliResSearch'
        }
      }
    ]
  },
  {
    path: '/function',
    component: '#',
    redirect: '/home/HomeData',
    name: 'Function',
    meta: {
      title: 'router.function',
      icon: 'ri:function-fill'
    },
    children: [
      {
        path: 'caliFiles',
        name: 'CaliFiles',
        component: 'views/Function/CaliFiles',
        meta: {
          title: 'router.caliFiles'
        }
      },
      {
        path: 'dataComparison',
        name: 'DataComparison',
        component: 'views/Function/DataComparison',
        meta: {
          title: 'router.dataComparison'
        }
      }
    ]
  }
]


export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: SUCCESS_CODE,
        data: roleName === 'admin' ? adminList : []
      }
    }
  }
] as MockMethod[]
