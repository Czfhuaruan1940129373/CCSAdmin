import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home/homeData',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/HomeData',
    name: 'Home',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled'
    },
    children: [
      {
        path: 'homeData',
        name: 'HomeData',
        component: () => import('@/views/Home/HomeData.vue'),
        meta: {
          title: t('router.workplace')
        }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/Home/Analysis.vue'),
        meta: {
          title: t('router.analysis')
        }
      }
    ]
  },
  {
    path: '/select',
    component: Layout,
    redirect: '/home/HomeData',
    name: 'Select',
    meta: {
      title: t('router.caliResSearch'),
      icon: 'carbon:search'
    },
    children: [
      {
        path: 'devSelect',
        name: 'DevSelect',
        component: () => import('@/views/Select/DevSelect.vue'),
        meta: {
          title: t('router.devCaliResSearch')
        }
      },
      {
        path: 'globalSelect',
        name: 'GlobalSelect',
        component: () => import('@/views/Select/GlobalSelect.vue'),
        meta: {
          title: t('router.globalCaliResSearch')
        }
      },
      {
        path: 'selectContent/:id',
        name: 'SelectContent',
        component: () => import('@/views/Select/SelectContent.vue'),
        meta: {
          hidden: true,
          canTo: true,
          title: t('router.testContent')
        }
      }
    ]
  },
  {
    path: '/function',
    component: Layout,
    redirect: '/home/HomeData',
    name: 'Function',
    meta: {
      title: t('router.function'),
      icon: 'ri:function-fill'
    },
    children: [
      {
        path: 'caliFiles',
        name: 'CaliFiles',
        component: () => import('@/views/Function/CaliFiles.vue'),
        meta: {
          title: t('router.caliFiles')
        }
      },
      {
        path: 'dataComparison',
        name: 'DataComparison',
        component: () => import('@/views/Function/DataComparison.vue'),
        meta: {
          title: t('router.dataComparison')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
