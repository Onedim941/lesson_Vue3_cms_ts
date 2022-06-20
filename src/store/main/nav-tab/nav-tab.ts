// 导入类型
import { Module } from 'vuex'
// 导入根store类型
import { IRootState } from '@/store/types'
// 导入 navTab state类型
import { INavTab } from './types'

const navTabModule: Module<INavTab, IRootState> = {
  state() {
    return {
      navTabList: []
    }
  },
  mutations: {
    changeNavTabList(state, payload) {
      state.navTabList = payload
    }
  }
}

export default navTabModule
