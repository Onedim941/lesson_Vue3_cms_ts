import { createRouter, createWebHashHistory } from 'vue-router'
// 表示导入的是一个type
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { fristMenu } from '@/utils/map-menus'
// import { registerRouter } from './hooks'
import routerChange from '@/utils/nav-tab'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// registerRouter(router)
// router.getRoutes() //可以获取所有的routers
// 冲突test

router.beforeEach((to) => {
  // 没有登录就跳到登录页

  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
    // 改变tab
    if (to.path !== '/main') {
      routerChange(to.path)
    }
    if (to.path === '/main') {
      if (fristMenu) {
        return fristMenu.url
      }
    }
  }
})

export default router
