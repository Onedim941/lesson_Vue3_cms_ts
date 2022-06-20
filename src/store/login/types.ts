import { RouteRecordRaw } from 'vue-router'

export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  // 需要注册的路由列表
  registerRouterList: RouteRecordRaw[]
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
