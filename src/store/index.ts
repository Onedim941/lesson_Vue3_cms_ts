import { createStore, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './types'
import type { Store } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import navTabModule from './main/nav-tab/nav-tab'
import dashboardModule from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system'

const store = createStore({
  state: (): IRootState => {
    return {
      msg: 'hello',
      // 部门列表
      entireDepartment: [],
      // 角色列表
      entireRole: [],
      // 角色菜单
      entireMenu: []
    }
  },
  mutations: {
    getMsg(state) {
      return state.msg
    },
    changeDepartment(state, list) {
      state.entireDepartment = list
    },
    changeRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 获取部门
      const depRes = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      // 获取角色
      const roleRes = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      // 获取角色菜单
      const roleMenuRes = await getPageListData('/menu/list', {})
      commit('changeDepartment', depRes.data.list)
      commit('changeRole', roleRes.data.list)
      commit('changeEntireMenu', roleMenuRes.data.list)
    }
  },
  getters: {},
  modules: {
    loginModule,
    systemModule,
    navTabModule,
    dashboardModule
  }
})

// 刷新时初始化 vuex
export function setupStore() {
  store.dispatch('loginModule/loadLocalAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
