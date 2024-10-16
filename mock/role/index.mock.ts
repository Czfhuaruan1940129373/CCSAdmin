import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 5000

const adminList = [
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
    redirect: '/select/globalSelect',
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
    redirect: '/function/caliFiles',
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

const devloperList = [
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
      }
    ]
  },
  {
    path: '/select',
    component: '#',
    redirect: '/select/devSelect',
    name: 'Select',
    meta: {
      title: 'router.caliResSearch',
      icon: 'carbon:search',
      alwaysShow: true,
    },
    children: [
      {
        path: 'devSelect',
        name: 'DevSelect',
        component: 'views/Select/DevSelect',
        meta: {
          title: 'router.devCaliResSearch'
        }
      }
    ]
  },
  {
    path: '/function',
    component: '#',
    redirect: '/function/dataComparison',
    name: 'Function',
    meta: {
      title: 'router.function',
      icon: 'ri:function-fill',
      alwaysShow: true,
    },
    children: [
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
      let dataList: any[]  = []
      if (roleName === 'admin') {
        dataList = adminList
      }else if (roleName === 'devloper') {
        dataList = devloperList
      }

      return {
        code: SUCCESS_CODE,
        data: dataList
      }
    }
  }
] as MockMethod[]
