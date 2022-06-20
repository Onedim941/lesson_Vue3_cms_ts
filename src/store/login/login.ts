import { Module } from 'vuex'
import type { IRootState } from '../types'
import type { ILoginState } from './types'
import type { IAccount } from '@/service/login/types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { registerRouter } from '@/router/hooks'
import { mapMenusToRouters } from '@/utils/map-menus'

// Module接口需要两个类型 S：模块中state得类型， R：根模块中state的类型
const loginModule: Module<ILoginState, IRootState> = {
  // 独立命名空间
  namespaced: true,
  state: (): ILoginState => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      registerRouterList: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changUserMenus(state, menus) {
      state.userMenus = menus
      // 我自己的方法
      // registerRouter(menus, router)
      // 老师的方法
      const routers = mapMenusToRouters(menus)
      // 存入需要注册的路由
      state.registerRouterList = routers
      routers.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code === 0) {
        // 1. 登录
        const { token, id } = loginResult.data
        commit('changeToken', token)
        localCache.setCache('token', token)
        // 2. 请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        commit('changUserInfo', userInfoResult.data)
        localCache.setCache('userInfo', userInfoResult.data)
        // 3.请求用户菜单
        const userMenuResult = await requestUserMenuByRoleId(
          userInfoResult.data.role.id
        )
        const userMenu = userMenuResult.data
        commit('changUserMenus', userMenu)
        localCache.setCache('userMenu', userMenu)
        router.push('/main')
      } else {
        localCache.delectCache('token')
        localCache.delectCache('userInfo')
      }
    },
    loadLocalAction({ commit }) {
      const token = localCache.getCache('token') ?? ''
      const userInfo = localCache.getCache('userInfo') ?? {}
      const userMenu = localCache.getCache('userMenu') ?? []
      commit('changeToken', token)
      commit('changUserInfo', userInfo)
      commit('changUserMenus', userMenu)
    }
  },
  getters: {}
}

export default loginModule
