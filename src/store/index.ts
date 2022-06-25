import { createStore, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './types'
import type { Store } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import navTabModule from './main/nav-tab/nav-tab'
import { getPageListData } from '@/service/main/system'

const store = createStore({
  state: (): IRootState => {
    return {
      msg: 'hello',
      // 部门列表
      entireDepartment: [],
      // 角色列表
      entireRole: []
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
      commit('changeDepartment', depRes.data.list)
      commit('changeRole', roleRes.data.list)
    }
  },
  getters: {},
  modules: {
    loginModule,
    systemModule,
    navTabModule
  }
})

// 刷新时初始化 vuex
export function setupStore() {
  store.dispatch('loginModule/loadLocalAction')
  // 获取部门 角色 数据
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
