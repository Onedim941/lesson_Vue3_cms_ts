import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import { deletePageData, getPageListData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
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
    },
    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const url = `${pageName}/${id}`
      const res = await deletePageData(url)
      dispatch('getUPageListAction', {
        pageName
      })
    }
  },
  getters: {
    pageListData(state) {
      type IPageName = 'usersList' | 'roleList'
      return (pageName: string) => {
        return state[`${pageName}List` as IPageName]
      }
    },
    pageDataCount(state) {
      type IPageName = 'usersCount' | 'roleCount'
      return (pageName: string) => {
        return state[`${pageName}Count` as IPageName]
      }
    }
  }
}

export default systemModule
