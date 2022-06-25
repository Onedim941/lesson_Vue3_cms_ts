import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  ceaterPageData,
  deletePageData,
  editPageData,
  getPageListData
} from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      queryInfo: {},
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
    changeQueryInfo(state, payload: any) {
      state.queryInfo[payload.pageName] = payload.queryInfo
    },
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
    async deletePageDataAction({ state, dispatch }, payload: any) {
      const { pageName, id, pageInfo } = payload
      const url = `${pageName}/${id}`
      const res = await deletePageData(url)
      dispatch('getUPageListAction', {
        pageName,
        queryInfo: { ...state.queryInfo[pageName], ...pageInfo }
      })
    },
    // 新建
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await ceaterPageData(pageUrl, newData)
      // 待优化： 默认查询项
      dispatch('getUPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 待优化： 默认查询项
      dispatch('getUPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
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
