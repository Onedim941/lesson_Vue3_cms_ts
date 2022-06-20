import { createStore, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './types'
import type { Store } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import navTabModule from './main/nav-tab/nav-tab'

const store = createStore({
  state: (): IRootState => {
    return {
      msg: 'hello'
    }
  },
  mutations: {
    getMsg(state) {
      return state.msg
    }
  },
  actions: {},
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
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
