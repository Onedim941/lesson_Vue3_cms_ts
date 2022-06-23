import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import { getPageListData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, list: any[]) {
      state.usersList = list
    },
    changeUserCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async getUPageListAction({ commit }, payload: any) {
      const pageName: string = payload.pageName
      const pageUrl = `/${pageName}/list`
      const fnName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      commit(`change${fnName}List`, list)
      commit(`change${fnName}Count`, totalCount)
    }
  },
  getters: {
    pageListData(state) {
      type IPageName = 'usersList' | 'roleList'
      return (pageName: string) => {
        return state[`${pageName}List` as IPageName]
      }
    }
  }
}

export default systemModule
